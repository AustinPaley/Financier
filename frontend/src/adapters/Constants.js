// Overview.js

export const API = process.env.REACT_APP_ALPHA_VANTAGE_API
export const URL1 = "https://www.alphavantage.co/query?function"
export const URL2 = "https://newsapi.org/v2/top-headlines?sources=the-wall-street-journal&apiKey="
export const DAILY = `=TIME_SERIES_DAILY`
export const SPXSYMBOL = "&symbol=SPX"
export const DJISYMBOL = "&symbol=DJI"
export const IXICSYMBOL = "&symbol=IXIC"
export const DAXSYMBOL = "&symbol=^GDAXI"
export const RUTSYMBOL = "&symbol=^RUT"
export const FTSESYMBOL = "&symbol=^FTSE"
export const VIXSYMBOL = "&symbol=^VIX"
export const CAC40SYMBOL = "&symbol=^FCHI"
export const NIKKEISYMBOL = "&symbol=^N225"
export const HSISYMBOL = "&symbol=^HSI"
export const ONEMINUTE = "&interval=1min"
export const SPXCALL = URL1 + DAILY + SPXSYMBOL + ONEMINUTE + API
export const DJICALL = URL1 + DAILY + DJISYMBOL + ONEMINUTE + API
export const IXICCALL = URL1 + DAILY + IXICSYMBOL + ONEMINUTE + API
export const DAXCALL = URL1 + DAILY + DAXSYMBOL + ONEMINUTE + API
export const RUTCALL = URL1 + DAILY + RUTSYMBOL + ONEMINUTE + API
export const FTSECALL = URL1 + DAILY + FTSESYMBOL + ONEMINUTE + API
export const VIXCALL = URL1 + DAILY + VIXSYMBOL + ONEMINUTE + API
export const CAC40CALL = URL1 + DAILY + CAC40SYMBOL + ONEMINUTE + API
export const NIKKEICALL = URL1 + DAILY + NIKKEISYMBOL + ONEMINUTE + API
export const HSICALL = URL1 + DAILY + HSISYMBOL + ONEMINUTE + API
export const WORLDWIDENEWS = "https://api.iextrading.com/1.0/stock/market/news/last/9"
export const NEWSAPI = process.env.REACT_APP_NEWS_API
export const TOPNEWS = URL2 + NEWSAPI
export const DownArrow = require('../images/down-arrow.png')
export const UpArrow = require('../images/up-arrow.png')


//App.js
export const EXISTINGACCOUNTURL = 'http://localhost:4000/api/v1/users'

//Matcher.js
export const POSTURL = "http://localhost:4000/api/v1/patterns"
export const DELETEURL = "http://localhost:4000/api/v1/patterns/"
export const DeleteButton = require('../images/delete-icon.png')
export const LoadingWheel = require('../images/loading-wheel.gif')

//Construction
export const Construction = require('../images/construction.png')

//REGISTER
export const NEWACCOUNTURL = 'http://localhost:4000/api/v1/users'
