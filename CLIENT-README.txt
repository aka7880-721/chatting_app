RELAY — FOR CLIENT
==================

1. Unzip the folder you received.
2. Double-click  run.bat
3. Relay opens in your browser automatically.

That is all. You do not install anything yourself.
You do not need Node.js if your developer sent the small client package.

When you are done, close the black window (Relay stops completely).

If the site still opens without run.bat, an old session is still running.
Open cmd in this folder and run:  run.bat stop
(or close every black "Relay" window).

---
Developer: run  npm run pack:client  to create Relay-Client.zip (~1 MB).
Do not send node_modules to the client.
