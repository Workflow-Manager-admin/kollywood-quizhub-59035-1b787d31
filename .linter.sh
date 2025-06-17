#!/bin/bash
cd /home/kavia/workspace/code-generation/kollywood-quizhub-59035-1b787d31/kollywood_quizhub_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

