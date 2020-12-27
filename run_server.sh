export GRDAI_ENV="production"
mkdir -p logs
rm -f logs/*
pm2 start index.js -i 1 --log logs/app.log --name beenlovememory
