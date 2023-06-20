import image from "./image"

const dummyProjectData = [
  {
    name: 'Project',
    avatar: image.poum,
    tasks: [
      {

      }
    ],
  },
  {
    name: 'UI UX Project',
  }
]

const dummyTasksData = [
  {
    id: 1,
    name: 'Implement everything you have',
    project: 'Project UI/UX',
    status: 'todo',
    priority: 'high',
    creator: 'Mr.Poum',
    // members: 
  },
  {
    id: 2,
    name: 'Add Figma to show demo of the app',
    project: 'Project UI/UX',
    status: 'in_review',
    priority: 'high',
    description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
    creator: {
      id: 1,
      name: 'Mr.Poum',
      avatar: image.poum,
    }
    // comments: [
    //   {
    //     id: 1,
    //   }
    // ],
  },
  {
    id: 3,
    name: 'Implement everything you have',
    project: 'Project UI/UX',
    status: 'todo',
    priority: 'high',
    // creator: 'Mr.Poum',
    // members: 
  },
  {
    id: 4,
    name: 'Implement everything you have',
    project: 'Project UI/UX',
    status: 'in_progress',
    priority: 'high',
    // creator: 'Mr.Poum',
    // members: 
  },
  {
    id: 5,
    name: 'Implement everything you have',
    project: 'Project UI/UX',
    status: 'done',
    priority: 'high',
    // creator: 'Mr.Poum',
    // members: 
  },
]

export default {
  dummyProjectData,
  dummyTasksData
}