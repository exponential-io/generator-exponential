# USAGE


mkdir -p ~/apps/exponential-practice && cd $_

cp -pR ~/opt/node/lib/node_modules/generator-exponential/examples/exponential/ .

exponential --project --mdf 'project'

exponential --api --mdf 'admin/blog'

exponential --angular --app --mdf 'admin/app'

exponential --angular --controller --mdf 'admin/blog'

exponential --angular --router --mdf 'admin/blog'

exponential --angular --service --mdf 'admin/blog'

exponential --angular --view --mdf 'admin/blog'

exponential --mongoose --mdf 'website/blog'

exponential --express --controller --mdf 'website/blog'

exponential --express --router --mdf 'website/blog'

exponential --express --view --mdf 'website/blog'

npm install

bower install


Exponential server side generator files:
examples/exponential/exponential/

`exponential` CLI command:
cli/exponential



## Setup project directory and MDF files

```bash
mkdir test01 && cd $_
mkdir exponential && cd $_

# copy all template files into test01/exponential
```

copy MDF files to . (or what I need is an exponential wrapper to create
the project directory)

## Quick Start

### Create a project
```bash
yo --insight=false exponential --mdf 'project';

yo exponential --mdf "project" --force --skip-install --insight=false;
```

### Create the companies API
```bash
yo exponential:api --mdf 'crm/companies';

yo exponential:api --mdf 'admin/blog';
```

### Create the CRM Angular app with the Companies module
```bash
yo exponential:angularApp --mdf 'crm/app';

yo exponential:angularController --mdf 'crm/companies';

yo exponential:angularRouter --mdf 'crm/companies';

yo exponential:angularService --mdf 'crm/companies';

yo exponential:angularView --mdf 'crm/companies';
```

### Create the Admin Angular app (Admin - Blog)
```bash
yo exponential:angularApp --mdf 'admin/app';

yo exponential:angularController --mdf 'admin/blog';

yo exponential:angularRouter --mdf 'admin/blog';

yo exponential:angularService --mdf 'admin/blog';

yo exponential:angularView --mdf 'admin/blog';

# single command
yo exponential:angularApp --mdf 'admin/app' && yo exponential:angularController --mdf 'admin/blog' && yo exponential:angularRouter --mdf 'admin/blog' && yo exponential:angularService --mdf 'admin/blog' && yo exponential:angularView --mdf 'admin/blog'
```

# Create the website
```bash
yo exponential:expressApp --mdf 'website/app';

# Home needs to call a number of subgenerators
# websitePage -> 
# express router: create new route
# express controller: create an express controller
# prefix controllers with website-{{pageName}}.js

# Page = controller + view + router
yo exponential:websitePage --mdf 'website/home';
yo exponential:websitePage --mdf 'website/privacy';
yo exponential:websitePage --mdf 'website/tos';

# Single command
yo exponential:websitePage --mdf 'website/home' && yo exponential:websitePage --mdf 'website/privacy' && yo exponential:websitePage --mdf 'website/tos';

# Form = controller + view + router + model
# not done yet
#yo exponential:expressForm --mdf 'website/contact';

# Internally, Form calls the following subgenerators
yo exponential:mongooseModel --mdf 'website/contact';

yo exponential:expressController --mdf 'website/contact';

yo exponential:expressView --mdf 'website/contact';

yo exponential:expressRouter --mdf 'website/contact';

# Single command
yo exponential:mongooseModel --mdf 'website/contact' && yo exponential:expressController --mdf 'website/contact' && yo exponential:expressView --mdf 'website/contact' && yo exponential:expressRouter --mdf 'website/contact'
```

# Blog generation for Express
```bash
# The model should aleady exist. How do I reuse the existing model?
#yo exponential:mongooseModel --mdf 'website/blog';

yo exponential:expressController --mdf 'website/blog';

yo exponential:expressView --mdf 'website/blog';

yo exponential:expressRouter --mdf 'website/blog';

# Single command
yo exponential:expressController --mdf 'website/blog' && yo exponential:expressView --mdf 'website/blog' && yo exponential:expressRouter --mdf 'website/blog'

```


####### Quick Test of web site and blog

yo exponential --mdf 'project' --skip-install --force

yo exponential:api --mdf 'admin/blog' && yo exponential:angularApp --mdf 'admin/app' && yo exponential:angularController --mdf 'admin/blog' && yo exponential:angularRouter --mdf 'admin/blog' && yo exponential:angularService --mdf 'admin/blog' && yo exponential:angularView --mdf 'admin/blog' && yo exponential:expressApp --mdf 'website/app' && yo exponential:websitePage --mdf 'website/home' && yo exponential:websitePage --mdf 'website/privacy' && yo exponential:websitePage --mdf 'website/tos' && yo exponential:mongooseModel --mdf 'website/contact' && yo exponential:expressController --mdf 'website/contact' && yo exponential:expressView --mdf 'website/contact' && yo exponential:expressRouter --mdf 'website/contact'











### Create the blog
```bash
yo exponential:api --mdf 'blog/posts';
yo exponential:api --mdf 'blog/admin-posts';

# is a separate app call appropriate here??? After all, this is
# part of the website app.
# yo exponential:expressApp --mdf 'blog/app';
yo exponential:expressController --mdf 'blog/posts';
yo exponential:expressRouter --mdf 'blog/posts';
yo exponential:expressService --mdf 'blog/posts';
yo exponential:expressView --mdf 'blog/posts';
yo exponential:expressModel --mdf 'blog/posts';

yo exponential:angularApp --mdf 'blog/admin-app';
yo exponential:angularController --mdf 'blog/admin-posts';
yo exponential:angularRouter --mdf 'blog/admin-posts';
yo exponential:angularService --mdf 'blog/admin-posts';
yo exponential:angularView --mdf 'blog/admin-posts';


yo exponential --mdf 'project';

yo exponential:api --mdf 'crm/companies' && yo exponential:angularApp --mdf 'crm/app' && yo exponential:angularController --mdf 'crm/companies' && yo exponential:angularRouter --mdf 'crm/companies' && yo exponential:angularService --mdf 'crm/companies' && yo exponential:angularView --mdf 'crm/companies' && yo exponential:expressApp --mdf 'website/app' && yo exponential:websitePage --mdf 'website/home' && yo exponential:websitePage --mdf 'website/privacy' && yo exponential:websitePage --mdf 'website/tos' && yo exponential:mongooseModel --mdf 'website/contact' && yo exponential:expressController --mdf 'website/contact' && yo exponential:expressView --mdf 'website/contact' && yo exponential:expressRouter --mdf 'website/contact' && yo exponential:angularApp --mdf 'admin/app' && yo exponential:api --mdf 'admin/blog' && yo exponential:angularController --mdf 'admin/blog' && yo exponential:angularRouter --mdf 'admin/blog' && yo exponential:angularService --mdf 'admin/blog' && yo exponential:angularView --mdf 'admin/blog'
```

### Create the blog admin UI as an Angular app (i.e. blog authoring)
```bash
yo exponential:angularApp --mdf 'blog/app';

yo exponential:angularController --mdf 'blog/posts';

yo exponential:angularRouter --mdf 'blog/posts';

yo exponential:angularService --mdf 'blog/posts';

yo exponential:angularView --mdf 'blog/posts';
```






## Create project

> There is one, and only one, `Project` MDF per project.

```bash
yo exponential --mdf 'project'
```

## Create the API

> API creation is always at the module level since each module has it's own
> standalone API.

```bash
yo exponential:api --mdf 'crm/companies'
```

It's a good idea to create the API first. It helps you to think about the data
in your application.

## Create application(s) (Angular and/or Server)

> Applicationn containers only make sense for Angular and/or server-side apps
> that have multiple modules. More specifically, APIs are always stand alone
> modules. Server-side code is of 2 types: **website**, and **server-side app**.

> THE `application` SUBGENERATOR IS NOT SETUP YET. I WILL CREATE IT FOR A
> SERVER-SIDE APP AFTER GETTING THE API SUBGENERATOR TO WORK
yo exponential:application --mdf 'crm/app'

The following command, without an application option, will run multiple 
subgenerators based on options specified in the mdf file.

```bash
# Create an entire Angular application
yo exponential:angular --mdf 'crm/*'

# Create a server-side Express application
yo exponential:express --mdf 'crm/*'

# Create an entire website
yo exponential:website --mdf 'website/*'
```


```bash
yo exponential:angular --app --mdf 'crm/app'

# Create an entire Angular module as defined in the MDF
yo exponential:angular --module --mdf 'crm/contacts'

yo exponential:angular --controller --mdf 'crm/contacts'
```

> The above command will internally call a subgenerator:
> yo exponential:angularApp --mdf 'crm/app'

```bash
> [DONE] yo exponential:angularApp --mdf 'crm/app'

yo exponential:angularModule --mdf 'crm/companies' [TODO AFTER ALL OTHERS ARE DONE B/C THIS GENERATOR JUST CALLS THE OTHER SUBGENERATORS]

> [DONE] yo exponential:angularController --mdf 'crm/companies' [TODO: LOOP SCHEMA]

yo exponential:angularDirective --mdf 'crm/companies'

yo exponential:angularFilter --mdf 'crm/companies'

> [DONE] yo exponential:angularRouter --mdf 'crm/companies'

> [DONE] yo exponential:angularService --mdf 'crm/companies'

yo exponential:angularProvider --mdf 'crm/companies'

yo exponential:angularFactory --mdf 'crm/companies'

yo exponential:angularValue --mdf 'crm/companies'

yo exponential:angularConstant --mdf 'crm/companies'

yo exponential:angularDecorator --mdf 'crm/companies'

> [DONE] yo exponential:angularView --mdf 'crm/companies' [TODO: LOOP SCHEMA]

```

## Create Companies Module

yo exponential:module --mdf 'crm/companies/companies'


// Load subapps
var companiesApi = require('./companies-api/server');
//app.use('/api/v1/companies', companiesApi);



//app.use('/api/v1/companies', companiesApi);





=============  OLD ===============

## Create website

yo exponential:website --mdf 'website/app'

## Create webapp

yo exponential:application --mdf 'website/app'

## Create module

yo exponential:module --mdf 'website/app'
