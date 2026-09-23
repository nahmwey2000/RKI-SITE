#!/bin/bash
# Double-click this file to preview the site on your computer.
# Then open http://localhost:3000. Close this window to stop it.
cd "$(dirname "$0")"
(sleep 4 && open http://localhost:3000) &
npm run dev
