cretae mentor profile,
1st step -> create component for mentor profile(mentor card)
2nd step -> import to parent component (main.jsx)
3rd step -> create mentors data from main.jsx . the data format should be array of object then you can add it multiple data,
4th step -> and pass the data to child component via props 
 <CardComponent
          key={index}
          name={mentor.name}
          designation={mentor.designation}
          institute={mentor.institute}
          tags={mentor.tags}
          contact={mentor.contact}
        />
5th step -> now we can use or access the data to child component (cardcomponent.jsx)
//we can access all data from child func with {}...   ex: ({ name, designation, institute, tags, contact })

6th step -> now itetrate the data which is get from parent component
ex: <p className="text-gray-600 font-semibold text-sm">{designation}</p>

7th: im using react-icons for phone and tags.

8th : tags data format shows like,
 mentors = [
    {
        tags:[
            "reactjs",....etc
        ]
    }
]
this format called , array of object and also use nested array instead of object.

9th step: {tags.map((tag, index) => ())} now we can iterate also map func because the tags format also array format, so we can use array iterate only map func.