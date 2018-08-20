#Code Test for Grove

## 1. Installation

### Requirements
- Node.js >= 6

```shell
git clone https://github.com/Andres-Botero/grove-code-test.git app
cd app
npm install
npm run build
```

## 2. Run Application

```shell
npm start
```

## 3. Configuration

src/config.js

## Demo

[Demo](http://grove.andresbotero.com)


## Application Structure

```
.
├── public                   
│   └── favicon.ico
│   └── index.html              
├── src                      # Application source code
│   ├── api                      
│   │   └── events.js
│   ├── components                  
│   │   ├── common           
│   │   │   └── Breakpoint.js
│   │   │   └── EventNotification.js
│   │   │   └── Footer.js
│   │   │   └── Header.js
│   │   ├── pages
│   │   │   ├── event
│   │   │   │   └── EventList.js
│   │   │   ├── home
│   │   │   │   └── HomePage.js
│   │   │   ├── schedule
│   │   │   │   └── SchedulePage.js
│   ├── styles               
│   |   └── App.css            
│   |   └── HomePage.css             
│   |   └── SchedulePage.css  
│   |   └── reset.css
│   └── App.js             
│   └── config.js
│   └── index.js               # Server application start point
│   └── routes.js           
├── node_modules             
└── package.json
└── README.md 
```
