# README - AngularModule SubGenerator

The overall module structure is:

1. router/<%= mdf.app.name.lowerPlural %>.js
2. views/<%= mdf.app.name.lowerPlural %>/
    create.html
    read-all.html
    read-one.html (details + edit)
    update.html [optional pattern]
3. controllers/<%= mdf.app.name.lowerPlural %>/
    create-ctrl.js
    read-all-ctrl.js
    read-one-ctrl.js (details + edit)
    update-ctrl.js [optional pattern]
4. services/<%= mdf.app.name.lowerPlural %>/
    <%= mdf.app.name.lowerPlural %>-srv.js