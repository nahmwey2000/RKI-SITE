#!/bin/bash
# Double-click this file to put the current version of the site online.
cd "$(dirname "$0")" && npx vercel --prod
echo
read -n 1 -s -r -p "Done. Press any key to close."
