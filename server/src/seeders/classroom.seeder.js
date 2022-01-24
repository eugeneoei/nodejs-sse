const classroomSeedData = [
    {
        name: '1A'
    },
    {
        name: '1B'
    }
]

const collectionNames = db.getCollectionNames()
const doesClassroomCollectionExist = collectionNames.includes('classrooms')

if (doesClassroomCollectionExist) {
    const doesClassroomCollectionHaveDocuments =
        db.classrooms.find().count() > 0
    if (doesClassroomCollectionHaveDocuments) {
        db.classrooms.drop()
    }
}

db.classrooms.insertMany(classroomSeedData)
