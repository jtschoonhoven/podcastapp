#!/usr/bin/python
import json
import os
from datetime import datetime
from peewee import PostgresqlDatabase, Model, ForeignKeyField, CharField, DateTimeField, TextField, BooleanField

config_path = os.path.join(os.path.dirname(__file__), '..', 'config.json')
with open(config_path) as f:
    config = json.load(f)

env = os.environ.get(config['constants']['ENV'], 'development')
pg_credentials = config[env]['PG_CREDENTIALS']
database = PostgresqlDatabase(**pg_credentials)


class BaseModel(Model):
    class Meta:
        database = database


class Publisher(BaseModel):
    name = CharField(null=False)
    created_at = DateTimeField(default=datetime.utcnow)

    class Meta:
        db_table = 'publishers'


class Show(BaseModel):
    publisher_id = ForeignKeyField(Publisher, related_name='shows')
    rss_url = CharField(null=False),
    name = CharField(null=False),
    description = TextField(),
    homepage_url = CharField(),
    image_url = CharField(),
    language = CharField(),
    audio = BooleanField(default=True),
    video = BooleanField(default=False),
    explicit = BooleanField(default=False),
    alive = BooleanField(default=True),
    created_at = DateTimeField(default=datetime.utcnow)

    class Meta:
        db_table = 'shows'


class Episode(BaseModel):
    show_id = ForeignKeyField(Show, related_name='episodes')
    title = CharField(null=False),
    episode_url = CharField(null=False),
    image_url = CharField(),
    hash = CharField(),
    author = CharField(),
    description = TextField(),
    guid = CharField(),
    audio_url = CharField(),
    audio_encoding = CharField(),
    audio_length = CharField(),
    video_url = CharField(),
    video_encoding = CharField(),
    video_length = CharField(),
    explicit = BooleanField(),
    published_at = DateTimeField(),
    created_at = DateTimeField(default=datetime.utcnow)

    class Meta:
        db_table = 'episodes'


class Tag(BaseModel):
    name = CharField(),
    created_at = DateTimeField(default=datetime.utcnow)

    class Meta:
        db_table = 'tags'


class ShowTag(BaseModel):
    show_id = ForeignKeyField(Show, related_name='tags')
    tag_id = ForeignKeyField(Tag, related_name='shows')
    created_at = DateTimeField(default=datetime.utcnow)

    class Meta:
        db_table = 'shows_tags'


class EpisodeTag(BaseModel):
    episode_id = ForeignKeyField(Episode, related_name='tags')
    tag_id = ForeignKeyField(Tag, related_name='episodes')
    created_at = DateTimeField(default=datetime.utcnow)

    class Meta:
        db_table = 'episodes_tags'


def create_tables():
    database.connect()
    database.create_tables([Publisher, Show, Episode, Tag, ShowTag, EpisodeTag])


import pdb
pdb.set_trace()

# >>> from datetime import date
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
