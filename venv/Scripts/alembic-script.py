#!"c:\users\don bax\desktop\school\computing\2019-2020\semester 2\info3180\projects\info3180-project2\venv\scripts\python.exe"
# EASY-INSTALL-ENTRY-SCRIPT: 'alembic==1.0.7','console_scripts','alembic'
__requires__ = 'alembic==1.0.7'
import re
import sys
from pkg_resources import load_entry_point

if __name__ == '__main__':
    sys.argv[0] = re.sub(r'(-script\.pyw?|\.exe)?$', '', sys.argv[0])
    sys.exit(
        load_entry_point('alembic==1.0.7', 'console_scripts', 'alembic')()
    )
