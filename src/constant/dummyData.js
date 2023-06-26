import image from "./image"

const dummyTasksData = [
  {
    id: 1,
    name: 'Implement everything you have',
    project: {
      id: 1,
      name: 'Project UI/UX',
    },
    status: 'todo',
    priority: 'high',
    creator: {
      id: 1,
      name: "Mr.Poum",
      image: image.poum,
    },
    assignee: {

    },
    supporter: {

    },
    reviewer: {

    }
  },
  {
    id: 2,
    name: 'Add Figma to show demo of the app',
    project: {
      id: 1,
      name: 'Project UI/UX',
    },
    status: 'in_review',
    priority: 'high',
    description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
    creator: {
      id: 1,
      email: 'abc@gmail.com',
      password: 'abc123',
      name: "Mr.Poum",
      image: image.poum,
    }
  },
  {
    id: 3,
    name: 'Say Hello To Everyone',
    project: {
      id: 1,
      name: 'Project UI/UX',
    },
    status: 'todo',
    priority: 'high',
    creator: {
      id: 1,
      email: 'abc@gmail.com',
      password: 'abc123',
      name: "Mr.Poum",
      image: image.poum,
    }
  },
  {
    id: 4,
    name: 'Learn PHP',
    project: {
      id: 1,
      name: 'Project UI/UX',
    },
    status: 'in_progress',
    priority: 'high',
    creator: {
      id: 1,
      email: 'abc@gmail.com',
      password: 'abc123',
      name: "Mr.Poum",
      image: image.poum,
    }
  },
  {
    id: 5,
    name: 'Learn From Aliki',
    project: {
      id: 1,
      name: 'Project UI/UX',
    },
    status: 'done',
    priority: 'high',
    creator: {
      id: 1,
      email: 'abc@gmail.com',
      password: 'abc123',
      name: "Mr.Poum",
      image: image.poum,
    }
  },
]

const dummyProjectData = [
  {
    id: 1,
    name: 'Project UI/UX',
    avatar: image.poum,
    tasks: dummyTasksData,
  },
  {
    id: 2,
    name: 'Project AI',
    avatar: image.poum,
    tasks: dummyTasksData,
  }
];

const dummyTeamData = [
  {
    id: 1,
    name: 'Astral Express~',
    members: [
      {
        id: 1,
        name: "Mr.Poum",
        image: image.poum,
      },
      {
        id: 2,
        name: "Mr.Poum",
        image: image.poum,
      },
    ],
    creator: {
      id: 1,
      name: "Mr.Poum",
      image: image.poum,
    },
    tasks: dummyTasksData,
    projects: [{
      id: 1,
      name: 'Project UI/UX',
    }],
  }
]

const dummyUserData = [
  {
    id: 1,
    email: 'abc@gmail.com',
    password: 'abc123',
    name: "Mr.Poum",
    image: image.poum,
    teams: [{
      id: 1,
      name: 'Astral Express~',
    }],
    notes: [],
    tasks: [],
    meets: [],
  },
  {
    id: 2,
    email: 'abcd@gmail.com',
    password: 'abcd123',
    name: "Herta",
    image: image.kuru,
    teams: [
      {
        id: 1,
        name: 'Astral Express~',
      },
      {
        id: 1,
        name: 'Astral Express~',
      },
    ],
    notes: [],
    tasks: [],
    meets: [],
  },
  {
    id: 1,
    email: 'abc@gmail.com',
    password: 'abc123',
    name: "Mr.Poum",
    image: image.poum,
    teams: [{
      id: 1,
      name: 'Astral Express~',
    }],
    notes: [],
    tasks: [],
    meets: [],
  },
  {
    id: 1,
    email: 'abc@gmail.com',
    password: 'abc123',
    name: "Mr.Poum",
    image: image.poum,
    teams: [{
      id: 1,
      name: 'Astral Express~',
    }],
    notes: [],
    tasks: [],
    meets: [],
  }
]

export default {
  dummyTeamData,
  dummyProjectData,
  dummyTasksData,
  dummyUserData
}