#!/usr/local/bin/python
import feedparser
import hashlib
import sys
from models import database, Publisher, Show, Episode, Tag, ShowTag, EpisodeTag


class AttributeMissing(ValueError):
    """Failed to save feed."""


class FetchShows(object):

    def _hash(self, *args):
        md5 = hashlib.md5()
        md5.update(args.join())
        return md5.hexdigest()

    def _strip_markup(self, string):
        """Find and remove HTML tags."""
        # TODO
        if type(string) is unicode:
            return string.decode('utf-8')
        return string

    def _sanitize_int(self, numeric):
        # TODO
        if numeric is None or numeric == '':
            return None
        return int(numeric)

    def _sanitize_bool(self, boolean):
        # TODO
        if boolean is True or str(boolean).lower().startswith('t'):
            return True
        elif boolean is False or str(boolean).lower().startswith('f'):
            return False
        return None

    def _sanitize_word(self, string):
        """Strict alphanumeric."""
        # TODO
        if type(string) is unicode:
            string = string.decode('utf-8')
        if type(string) is str:
            string = string.lower()
        return string

    def _sanitize_title(self, string):
        """Alphanum with limited special chars, formatted as title."""
        # TODO
        return self._sanitize_word(string)

    def _sanitize_url(self, string):
        """Returns false if unable to validate."""
        # TODO
        return string

    def _sanitize_text(self, string):
        """Alphanum text with HTML removed + limited special characters."""
        # TODO
        return string

    def _new_publisher(self, feed):
        name = feed.get('publisher') \
            or feed.get('author') \
            or feed.get('contributors') \
            or 'unknown'

        safe_name = self._sanitize_title(name)
        publisher, is_new = Publisher.get_or_create(name=safe_name)
        print('Saved publisher "{}": new={}'.format(safe_name, is_new))
        return publisher

    def _new_show(self, rss_url, publisher, feed):
        description = feed.get('description') or feed.get('summary')
        image_url = feed.get('image', {}).get('href') \
            or feed.get('logo') \
            or feed.get('icon')

        show_dict = {
            'publisher': publisher,
            'name': self._sanitize_title(feed.get('title')),
            'description': self._sanitize_text(description),
            'homepage_url': self._sanitize_url(feed.get('link')),
            'image_url': self._sanitize_url(image_url),
            'language': self._sanitize_word(feed.get('language'))
        }

        show_dict = {key: value for key, value in show_dict.iteritems() if value is not None}
        show, is_new = Show.get_or_create(rss_url=rss_url, defaults=show_dict)
        print('Saved show "{}": new={}'.format(show_dict['name'], is_new))
        return show

    def _new_episode(self, show, episode):
        if type(episode.get('title') is unicode):
            episode['title'] = episode['title'].encode('utf-8')

        is_audio = True
        media_link = next((link for link in episode.links if link.get('type', '').startswith('audio/')), {})

        if not media_link:
            is_audio = False
            media_link = next((link for link in episode.links if link.get('type', '').startswith('video/')), {})

        description = episode.get('subtitle') or episode.get('summary')
        media_encoding = media_link['type'].split('/')[1] if media_link.get('type', '').split('/')[1:2] else None
        media_url = self._sanitize_url(media_link.get('href'))

        if not media_url:
            print('Warning! Episode has no link to media file.')
            return None

        episode_dict = {
            'show': show,
            'title': self._sanitize_title(episode.get('title')),
            'description': self._sanitize_text(description),
            'media_encoding': self._sanitize_word(media_encoding),
            'media_length': self._sanitize_int(media_link.get('itunes_duration')),
            'is_audio': is_audio,
            'image_url': self._sanitize_url(episode.get('image', {}).get('href')),
            'episode_url': self._sanitize_url(episode.get('link')),
            'explicit': self._sanitize_bool(episode.get('itunes_explicit'))
        }

        episode_dict = {key: value for key, value in episode_dict.iteritems() if value is not None}
        episode, is_new = Episode.get_or_create(media_url=media_url, defaults=episode_dict)
        print('Saved episode "{}": new={}'.format(episode_dict['title'], is_new))
        return show

    def _new_tag(self, tag):
        name = tag.get('term') or tag.get('label')
        clean_name = self._sanitize_title(name)
        tag, is_new = Tag.get_or_create(name=clean_name)
        print('Saved tag "{}": new={}'.format(clean_name, is_new))
        return tag

    def _new_show_tag(self, show, tag):
        show_tag, is_new = ShowTag.get_or_create(show=show, tag=tag)
        print('Saved episode_tag: new={}'.format(is_new))
        return show_tag

    def _new_episode_tag(self, episode, tag):
        episode_tag, is_new = EpisodeTag.get_or_create(episode=episode, tag=tag)
        print('Saved episode_tag: new={}'.format(is_new))
        return episode_tag

    def fetch_one_show(self, rss_url):
        rss = feedparser.parse(rss_url)

        with database.transaction():
            publisher = self._new_publisher(rss.feed)
            show = self._new_show(rss_url, publisher, rss.feed)

            for tag in rss.feed.get('tags', []):
                tag = self._new_tag(tag)
                self._new_show_tag(show, tag)

            for entry in rss.entries:
                episode = self._new_episode(show, entry)

                for tag in entry.get('tags', []):
                    tag = self._new_tag(tag)
                    self._new_episode_tag(episode, tag)


if __name__ == '__main__':
    fetcher = FetchShows()
    urls = sys.argv[1:]
    if urls:
        for url in urls:
            fetcher.fetch_one_show(url)
    else:
        # fetcher.fetch_one_show('http://feeds.feedburner.com/SlatePoliticalGabfest')
        # fetcher.fetch_one_show('http://feeds.wnyc.org/radiolab')
        fetcher.fetch_one_show('http://voxtheweeds.slate.libsynpro.com/rss')
