#!/usr/bin/python
import json
import os
import peewee as db
import sys
from datetime import datetime

config_path = os.path.join(os.path.dirname(__file__), '..', 'config.json')
with open(config_path) as f:
    config = json.load(f)

env = os.environ.get(config['constants']['ENV'], 'development')
pg_credentials = config[env]['PG_CREDENTIALS']
database = db.PostgresqlDatabase(**pg_credentials)


class BaseModel(db.Model):
    class Meta:
        database = database


class Publisher(BaseModel):
    name = db.CharField()
    created_at = db.DateTimeField(default=datetime.utcnow)

    class Meta:
        db_table = 'publishers'


class Show(BaseModel):
    publisher = db.ForeignKeyField(Publisher, related_name='shows')
    rss_url = db.CharField()
    name = db.CharField()
    description = db.TextField(null=True)
    homepage_url = db.CharField(null=True)
    image_url = db.CharField(null=True)
    language = db.CharField(null=True)
    audio = db.BooleanField(default=True)
    video = db.BooleanField(default=False)
    explicit = db.BooleanField(default=False)
    alive = db.BooleanField(default=True)
    created_at = db.DateTimeField(default=datetime.utcnow)

    class Meta:
        db_table = 'shows'


class Episode(BaseModel):
    show = db.ForeignKeyField(Show, related_name='episodes')
    title = db.CharField()
    description = db.TextField(null=True)
    media_url = db.CharField(unique=True)
    media_encoding = db.CharField()
    media_length = db.CharField(null=True)
    image_url = db.CharField(null=True)
    author = db.CharField(null=True)
    is_audio = db.BooleanField()
    episode_url = db.CharField(null=True)
    explicit = db.BooleanField(default=False)
    published_at = db.DateTimeField(null=True)
    created_at = db.DateTimeField(default=datetime.utcnow)

    class Meta:
        db_table = 'episodes'


class Tag(BaseModel):
    name = db.CharField()
    created_at = db.DateTimeField(default=datetime.utcnow)

    class Meta:
        db_table = 'tags'


class ShowTag(BaseModel):
    show = db.ForeignKeyField(Show, related_name='tags')
    tag = db.ForeignKeyField(Tag, related_name='shows')
    created_at = db.DateTimeField(default=datetime.utcnow)

    class Meta:
        db_table = 'shows_tags'


class EpisodeTag(BaseModel):
    episode = db.ForeignKeyField(Episode, related_name='tags')
    tag = db.ForeignKeyField(Tag, related_name='episodes')
    created_at = db.DateTimeField(default=datetime.utcnow)

    class Meta:
        db_table = 'episodes_tags'


all_models = [Publisher, Show, Episode, Tag, ShowTag, EpisodeTag]


if __name__ == '__main__' and len(sys.argv) == 2:
    database.connect()
    if sys.argv[1] == '--create':
        print('CREATE')
        database.create_tables(all_models)
    elif sys.argv[1] == '--drop':
        print('DROP')
        database.drop_tables(all_models)

# >>> uncle_bob = Person(name='Bob', birthday=date(1960, 1, 15), is_relative=True)
# >>> uncle_bob.save() # bob is now stored in the database

# >>> grandma = Person.create(name='Grandma', birthday=date(1935, 3, 1), is_relative=True)
# >>> herb = Person.create(name='Herb', birthday=date(1950, 5, 5), is_relative=False)

# >>> grandma.name = 'Grandma L.'
# >>> grandma.save()  # Update grandma's name in the database.

# >>> bob_kitty = Pet.create(owner=uncle_bob, name='Kitty', animal_type='cat')
# >>> herb_fido = Pet.create(owner=herb, name='Fido', animal_type='dog')
# >>> herb_mittens = Pet.create(owner=herb, name='Mittens', animal_type='cat')
# >>> herb_mittens_jr = Pet.create(owner=herb, name='Mittens Jr', animal_type='cat')

# >>> herb_mittens.delete_instance() # he had a great life
