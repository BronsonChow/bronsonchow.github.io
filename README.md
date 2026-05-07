# Website Documentation for CSC 225
Link to homepage: https://bronsonchow.github.io/
  
Link to the API section: [VocaDB API General Information](#API-General-Information)
  
### VocaDB API General Information
API requests are not protected by any key, it is a public API. However, anything that modifies data, such as POST or DELETE, requires a key which requires contacting the website administrators to be approved and whitelisted.
  
| | |
| :---: | --- |
| Domain URL | [https://vocadb.net/](https://vocadb.net/) |
| Domain Endpoint URL | [https://vocadb.net/api/](https://vocadb.net/api/) |
| Documentation URL | [https://vocadb.net/swagger/index.html](https://vocadb.net/swagger/index.html) |
| Rate Limit Restrictions | No specified amount, stated to be in the 1000s per day in rapid succession leading to IP ban |
| Type | REST |

### Endpoints Used
| HTTP method |  |
| :---: | --- |
| GET | [https://vocadb.net/api/songs/***{ID}***?fields=MainPicture&lang=English](https://vocadb.net/api/songs/{ID}?fields=MainPicture&lang=English) |
| GET | [https://vocadb.net/api/artists/***{ID}***?fields=MainPicture&lang=English](https://vocadb.net/api/artists/{ID}?fields=MainPicture&lang=English) |
| GET | [https://vocadb.net/api/songs/top-rated?maxResults=***{INT}***&fields=MainPicture&languagePreference=English](https://vocadb.net/api/songs/top-rated?maxResults={int}&fields=MainPicture&languagePreference=English) |
  
### Request Parameters
No authentication key is required for GET method.
|  |  |
| :---: | --- |
| Example Usage 1 | To get song information: [https://vocadb.net/api/songs/***{ID}***](https://vocadb.net/api/songs/{ID}) |
| Example Usage 2 | To get artist information: [https://vocadb.net/api/artists/***{ID}***](https://vocadb.net/api/artists/{ID}) |
| Example Usage 3 | To get the top 10 rated songs of all time on vocadb.net: [https://vocadb.net/api/songs/top-rated?maxResults=10](https://vocadb.net/api/songs/top-rated?maxResults=10) |

### Sample Request & Response
You can make HTTPS requests to vocadb which consists of a base URL "vocadb.net", then the subdirectory "/api", and finally the API method.

Used API Methods
  - Specific song information:
    - /api/songs/***{ID}***
  - Specific song information with query parameters to include thumbnail image and default English language:
    - /api/songs/***{ID}***?fields=MainPicture&lang=English
  - Specific artist information:
    - /api/artists/***{ID}***
  - Specific artist information with query parameters to include thumbnail image and default English language:
    - /api/artists/***{ID}***?fields=MainPicture&lang=English
  - List top 10 rated songs on vocadb of all time
    - /api/songs/top-rated?maxResults=***{10}***
  
| | Example Response |
| :---: | --- |
| Song Request | [https://vocadb.net/api/songs/805916](https://vocadb.net/api/songs/805916) |
| Response body |<pre>{<br/>  "artistString": "Jamie Paige, OK GLASS feat. 重音テトSV",<br/>  "createDate": "2025-06-28T01:36:18.68",<br/>  "defaultName": "BIRDBRAIN",<br/>  "defaultNameLanguage": "English",<br/>  "favoritedTimes": 162,<br/>  "id": 805916,<br/>  "lengthSeconds": 256,<br/>  "name": "BIRDBRAIN",<br/>  "publishDate": "2025-06-27T00:00:00Z",<br/>  "pvServices": "Youtube, Bandcamp",<br/>  "ratingScore": 724,<br/>  "songType": "Original",<br/>  "status": "Finished",<br/>  "version": 32<br/>}</pre>|
| Producer Request | [https://vocadb.net/api/artists/144555](https://vocadb.net/api/artists/144555) |
| Response body |<pre>{<br/>  "artistType": "Producer",<br/>  "createDate": "2024-09-02T07:39:56.357",<br/>  "createDate": "2024-09-02T07:39:56.357",<br/>  "defaultName": "東京真中",<br/>  "defaultNameLanguage": "Japanese",<br/>  "id": 144555,<br/>  "name": "東京真中",<br/>  "pictureMime": "image/jpeg",<br/>  "status": "Finished",<br/>  "version": 11<br/>}</pre>|
| Top 2 Songs Request | [https://vocadb.net/api/songs/top-rated?maxResults=2](https://vocadb.net/api/songs/top-rated?maxResults=2) |
| Response body |<pre>[<br/>  {<br/>    "artistString": "wowaka feat. 初音ミク",<br/>    "createDate": "2011-11-01T22:10:01",<br/>    "defaultName": "ローリンガール",<br/>    "defaultNameLanguage": "Japanese",<br/>    "favoritedTimes": 724,<br/>    "id": 1501,<br/>    "lengthSeconds": 196,<br/>    "name": "ローリンガール",<br/>    "publishDate": "2010-02-14T00:00:00Z",<br/>    "pvServices": "NicoNicoDouga, Youtube, SoundCloud",<br/>    "ratingScore": 3317,<br/>    "songType": "Original",<br/>    "status": "Approved",<br/>    "version": 39<br/>  },<br/>  {<br/>    "artistString": "iroha(sasaki) feat. 鏡音リン",<br/>    "createDate": "2011-11-07T12:07:40",<br/>    "defaultName": "炉心融解",<br/>    "defaultNameLanguage": "Japanese",<br/>    "favoritedTimes": 678,<br/>    "id": 3022,<br/>    "lengthSeconds": 333,<br/>    "name": "炉心融解",<br/>    "publishDate": "2008-12-19T00:00:00Z",<br/>    "pvServices": "NicoNicoDouga, Youtube, SoundCloud, Bilibili",<br/>    "ratingScore": 3052,<br/>    "songType": "Original",<br/>    "status": "Approved",<br/>    "version": 68<br/>  }<br/>]</pre>|
