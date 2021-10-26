#  Server for Notes App

notes-node app is a node server which will handle  different notes activities library for dealing with word pluralization.

## Setup

Use the package manager [pip](https://pip.pypa.io/en/stable/) to install foobar.

Use git clone to clone the project [git url] ()

```bash
 git clone https://github.com/srk31588/notes_node
```
Navigate to the folder which created newly

>notes_node.

Check you node and npm versions. Should be same or above versions shown below.
```bash
 $ node -v
  v17.0.1
```
```bash
 $ npm -v
  8.1.0
```
if you are first time to node follow instructions [here](https://www.geeksforgeeks.org/installation-of-node-js-on-windows/?ref=lbp) to install node newly

Once your able of see versions of node and npm in your system.

In `notes_node` folder run below install command to install all packages.
```bash
 $  npm install package.json
```

Once package install done run below command to start node server.

```bash
 $  node index.js
```

## Usage

Notes server is an app which will saves/retrieves/deletes notes in embedded db.

Notes will be saved in lowdb as json with name and content. Each node should/will have its name and content.

>sample notes object
```javascript
{
  "name": "firstNotes",
  "content": "This is content of first notes"
}
```
> name set to 20 alpha numeric characters limit.

> content has set to 5000 alpha numeric characters limit
### This server handles all below operations of notes.

1. You should be able to read all notes.

2. You should be able to add one or more notes.

3. You should be able to edit a note.

4. You should be able to delete one or more notes.

5. You should be able to search/get notes.

### 1. Read All nodes.

   #### Request
`GET /api/notes`
 #### Response
`[
    {
        "name": "firstNotes",
        "content": "This is content of first notes"
    }
]`

### 2. Add one or more notes
 #### Request
`POST /api/notes`
#### Body - Should be array of notes objects
` [
	{
	"name" : "Add1",
	"content" : "Content of Add1"
	},
	{
	"name" : "Add2",
	"content" : "Content of Add3"
	},
	{
	"name" : "Add3",
	"content" : "Content of Add3"
	}
]`
 #### Response - All notes of db
` [
    {
        "name": "firstNotes",
        "content": "This is content of first notes"
    },
    {
        "name": "Add1",
        "content": "Content of Add1"
    },
    {
        "name": "Add2",
        "content": "Content of Add3"
    },
    {
        "name": "Add3",
        "content": "Content of Add3"
    }
]`

### 3. Edit notes
 #### Request
`PUT /api/notes`
#### Body - Should be a notes objects
`	{
	"name" : "Add3",
	"content" : "Updated AD3"
	}`
### Response
`For Success :: it return Success`

`For Failure ::  Notes with the given name not found.`

### 4. Delete one or more notes

#### 4.1 Delete single notes
  #### Request
`DELETE /api/notes/<notes name>`
#### Body - NO BODY needed

### Response
`For Success :: Success`

`For Failure :: Notes with the given name not found. `

#### 4.2 Delete one/multiple notes
  #### Request
`DELETE /api/notes`
#### Body
`[{
	"name":"Add2"
},
{
	"name":"Add3"
}]`

### Response
`For Success :: Deleted all requested notes`

`For (Partial)Failure :: <notesname 1> , <notesname2> ... notes are notfound, remaining deleted successfully.`

#### 5. Search a notes in DB
##### Request
`GET /api/notes/<notesname>`
##### Body
`NO BODY`
##### Response
`{
    "name": "Add1",
    "content": "Content of Add1"
}`

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)
