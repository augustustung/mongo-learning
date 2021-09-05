# Learning Mongo DB


### Basic commandline

`show dbs`: show all dbs were created

`use <db-name>`: to switch create new lib

`db.<collection>.<command>`
    - `db.category.insert({...})`
    //#first obj contain _id of collections, the other contain "params"
    - `db.product.update({_id: ObjectId("...")}, { $set: { stockQuantity: 100 }} })`
    - `db.product.find()` #find all
    - `db.product.findOne().pretty()` #select some first items

`show collections`: see all collections


### Data types
Obj ID
- 12 bytes (24 hexa decimal)
- contain 4 byte timestamp + 5 byte random + 3 byte increasing counter
- _id is automatically assigned with a new ObjectId
- Methods:
    + getTimestamp
    + valueOf
    + toString
- Properties:
    + str

### Import data from CSV
`mongoimport --type csv -d <db> -c <collection> --headerline --drop </path/to/file.csv>`

### Query data
`db.<collection>.find(<query>)`
- `{key: value}`
- `{key: {$ne: value}}`
- `{key: {$gt: value}}`
- `{key: {$gte: value}}`
- `{key: {$lte: value}}`
- `{key: {$in: value}}`
- `{key: {$nin: value}}`

**exapmle** : `db.books.find({ name: /edu$/ }).pretty()`
regular expression `/.edu/`
`/.edu$/` : end with edu
`/\.edu/`: character `.` not doc
`/^1\./`: start with `1.`

### Multi-field query
- `$and`: `db.<collection>.find({
    key1: value1,
    key2: value2
})`

- `$or`: `db.<collection>.find({
    $or: [`condition1`, `condition2`]
})`

### Nested Oject
- example:
`{
    _id: ObjectId("..."),
    profile: {
        name: "ABC",
        city: "XYZ",
        work: "MMM"
    }
}`

- query: `db.users.find({
    "profile.name": "ABC"
})`

### Array field
- example: 
`{
    _id: ObjectId("..."),
    profile: {
        name: "ABC",
        city: "XYZ",
        work: "MMM"
    },
    languages: [
        "English",
        "Japanese",
        ...
    ]
}`

- query:
    + `db.users.find({
        "languages": "English"
    })` #people who can speak English
    
    + `db.users.find({ languages: { $size: 2 }})` #people who can speak 2 languages

### Array of embedded documents
** in json file it has its name field, so don't have to use `--headerline` **

`mongomport --type json -d <db> -c <collection> --drop <path/to/file.json>`

- example: `db.pet_owner.find({ "pets.type": 1 })`
- `db.pet_owner.find({ 
    $elementMatch: { type: 2, name: /^C/ }
})`

//find all pets with type 2 and name start with "C"

### Query null
`db.user.find({ last_loggin: { $exists: false }})`

## `WHERE` collections
`db.<collection>.find({ $where: "js expression"})`

- example:
    + normal: `db.user.find({ first_name: "Willis" })`
    + $where: `db.user.find({ $where: "this.first_name === "Willis" })`


### COUNT, SKIP, LIMIT
`db.<collection>.find(query).skip<x>.limit(y)` //from x to y
`db.<collection>.count(query)` //count return length

### SORT
`db.<collection>.find(query).sort({
    field1: -1,
    field2: 1
})`

//1: ascending order
//-1: descending order


### CRUD
- `db.<collection>.insert(doc)`
- `db.<collection>.insertMany(docs)`
- `db.<collection>.find(query)`
- `db.<collection>.findOne(query)`
- `db.<collection>.updateOne(query, data)`
- `db.<collection>.updateMany(query, data)`
- `db.<collection>.deleteOne(query)`
- `db.<collection>.deleteMany(query)`

- update document: `db.<collection>.updateOne(whatToUpdate, howToUpdate)`
    + whatToUpdate = query object
    + howToUpdate = {
        $set: {
            field1: value1,
            field2: value2,
            "field3.subField": value
        }
    }
- example: 
    + update "first_name": `db.users.updateOne({_id: ObjectId(...)}, { $set: { first_name: "AAAAAA" }})`
    + update nested field: `db.users.updateOne({_id: ObjectId(...)}, { $set: { "settings.language": "ja" }})`
    + deleteOne: `db.users.deleteOne({_id: ObjectId(...)})`
    + deleteMany: `db.users.deleteMany({ gender: "Male" })` //delete all user whose gender is  "Male"

### Atomic operator
- $inc //increase
- $push 
- $pull
- $addToSet

- example: 
`
    db.post.updateOne({_id: ObjectId("....)}, {
        $inc: {
            like: 1 //increasing number of like + 1
        },
        $push:{ 
            like: ObjectId("...") //push id user who is liked, but dont check
        },
        $pull: {
            like: ObjectId("....") //delete user who has id ...
        },
        $addToSet: {
            like: ObjectId("...") //push and check if exists return null
        }
    })
`

### Collection methods
- `db.<collection>.drop()` //delete collection
- `db.<collection>.renameCollection("new name")`

### Index
- example: `db.users.findOne({ email: "ABC@example.COM })`

**index**
- a@example.com
- b@example.com
...

then db will search with `binary search` algorithm

### Compound index
- example: `db.createIndex({ age: 1, yearOfExperience: 1 })`

- When use index: 
    + make writing slower but reading faster
    + too many indexes will cost more RAM