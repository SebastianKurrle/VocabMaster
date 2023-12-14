
def get_db_con(debug, base_dir):
    db = {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': 'vocab_master',
        'USER': 'vmuser',
        'PASSWORD': 'Sebi007!',
        'HOST': 'localhost',
        'PORT': '',
    }

    if debug:
        db = {
            'ENGINE': 'django.db.backends.sqlite3',
            'NAME': base_dir / 'db.sqlite3',
        }

    return db
