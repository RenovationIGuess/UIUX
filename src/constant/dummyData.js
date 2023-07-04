/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import image from "./image";
import dayjs from "dayjs";
import events from "./events"

const dummyTasksData = [
  {
    id: 1,
    name: "Implement everything you have",
    project: {
      id: 1,
      name: "Project UI/UX",
    },
    status: "to do",
    priority: "medium",
    completion: 50,
    start: new Date(2023, 7, 4, 17, 0, 0),
    end: new Date(2023, 7, 12, 18, 30, 0),
    creator: {
      id: 1,
      name: "Mr.Poum",
      image: image.poum,
    },
    assignee: [
      {
        id: 5,
        name: "Stellaron Hunta",
        image: image.kafka,
      },
    ],
    supporter: [
      {
        id: 6,
        name: "Another Herta",
        image: image.herta,
      },
    ],
    reviewer: [
      {
        id: 4,
        name: "Shogun Sama :))",
        image: image.jingyuan,
      },
    ],
  },
  {
    id: 2,
    name: "Add Figma to show demo of the app",
    project: {
      id: 1,
      name: "Project UI/UX",
    },
    status: "in review",
    priority: "high",
    completion: 30,
    start: new Date(2023, 7, 28, 17, 0, 0),
    end: new Date(2023, 7, 29, 18, 30, 0),
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    creator: {
      id: 1,
      name: "Mr.Poum",
      image: image.poum,
    },
    assignee: [
      {
        id: 5,
        name: "Stellaron Hunta",
        image: image.kafka,
      },
    ],
    supporter: [
      {
        id: 6,
        name: "Another Herta",
        image: image.herta,
      },
    ],
    reviewer: [
      {
        id: 4,
        name: "Shogun Sama :))",
        image: image.jingyuan,
      },
    ],
  },
  {
    id: 3,
    name: "Say Hello To Everyone",
    project: {
      id: 1,
      name: "Project UI/UX",
    },
    status: "to do",
    priority: "low",
    completion: 90,
    start: new Date(2023, 7, 1, 17, 0, 0),
    end: new Date(2023, 7, 5, 18, 30, 0),
    creator: {
      id: 1,
      name: "Mr.Poum",
      image: image.poum,
    },
    assignee: [
      {
        id: 5,
        name: "Stellaron Hunta",
        image: image.kafka,
      },
    ],
    supporter: [
      {
        id: 6,
        name: "Another Herta",
        image: image.herta,
      },
    ],
    reviewer: [
      {
        id: 4,
        name: "Shogun Sama :))",
        image: image.jingyuan,
      },
    ],
  },
  {
    id: 4,
    name: "Learn PHP",
    project: {
      id: 1,
      name: "Project UI/UX",
    },
    status: "done",
    priority: "high",
    completion: 100,
    start: new Date(2023, 7, 10, 17, 0, 0),
    end: new Date(2023, 7, 20, 18, 30, 0),
    creator: {
      id: 5,
      name: "Stellaron Hunta",
      image: image.kafka,
    },
    assignee: [
      {
        id: 1,
        name: "Mr.Poum",
        image: image.poum,
      },
    ],
    supporter: [
      {
        id: 6,
        name: "Another Herta",
        image: image.herta,
      },
    ],
    reviewer: [
      {
        id: 4,
        name: "Shogun Sama :))",
        image: image.jingyuan,
      },
    ],
  },
  {
    id: 5,
    name: "Learn From Aliki",
    project: {
      id: 1,
      name: "Project UI/UX",
    },
    status: "done",
    priority: "medium",
    completion: 100,
    start: new Date(2023, 7, 1, 17, 0, 0),
    end: new Date(2023, 7, 10, 18, 30, 0),
    creator: {
      id: 4,
      name: "Shogun Sama :))",
      image: image.jingyuan,
    },
    assignee: [
      {
        id: 1,
        name: "Mr.Poum",
        image: image.poum,
      },
    ],
    supporter: [
      {
        id: 6,
        name: "Another Herta",
        image: image.herta,
      },
    ],
    reviewer: [
      {
        id: 5,
        name: "Stellaron Hunta",
        image: image.kafka,
      },
    ],
  },
  {
    id: 6,
    name: "How to be the most failure?",
    project: {
      id: 2,
      name: "Project AI",
    },
    status: "in progress",
    priority: "medium",
    completion: 20,
    start: new Date(2023, 7, 1, 17, 0, 0),
    end: new Date(2023, 7, 5, 18, 30, 0),
    creator: {
      id: 4,
      name: "Shogun Sama :))",
      image: image.jingyuan,
    },
    assignee: [
      {
        id: 1,
        name: "Mr.Poum",
        image: image.poum,
      },
    ],
    supporter: [
      {
        id: 6,
        name: "Another Herta",
        image: image.herta,
      },
    ],
    reviewer: [
      {
        id: 5,
        name: "Stellaron Hunta",
        image: image.kafka,
      },
    ],
  },
  {
    id: 7,
    name: "How to be rich?",
    project: {
      id: 2,
      name: "Project AI",
    },
    status: "in progress",
    priority: "high",
    completion: 1,
    start: new Date(2023, 8, 15, 1, 0, 0),
    end: new Date(2023, 8, 22, 23, 30, 0),
    creator: {
      id: 4,
      name: "Shogun Sama :))",
      image: image.jingyuan,
    },
    assignee: [
      {
        id: 1,
        name: "Mr.Poum",
        image: image.poum,
      },
    ],
    supporter: [
      {
        id: 6,
        name: "Another Herta",
        image: image.herta,
      },
    ],
    reviewer: [
      {
        id: 5,
        name: "Stellaron Hunta",
        image: image.kafka,
      },
    ],
  },
  {
    id: 8,
    name: "How to be the most failure?",
    project: {
      id: 2,
      name: "Project AI",
    },
    status: "in progress",
    priority: "medium",
    completion: 20,
    start: new Date(2023, 7, 6, 14, 0, 0),
    end: new Date(2023, 7, 9, 18, 30, 0),
    creator: {
      id: 4,
      name: "Shogun Sama :))",
      image: image.jingyuan,
    },
    assignee: [
      {
        id: 1,
        name: "Mr.Poum",
        image: image.poum,
      },
    ],
    supporter: [
      {
        id: 6,
        name: "Another Herta",
        image: image.herta,
      },
    ],
    reviewer: [
      {
        id: 5,
        name: "Stellaron Hunta",
        image: image.kafka,
      },
    ],
  },
  {
    id: 9,
    name: "Phần mềm chấm công?",
    project: {
      id: 3,
      name: "ITSS :D?",
    },
    status: "in progress",
    priority: "medium",
    completion: 20,
    start: new Date(2023, 7, 1, 10, 0, 0),
    end: new Date(2023, 7, 2, 18, 30, 0),
    creator: {
      id: 4,
      name: "Shogun Sama :))",
      image: image.jingyuan,
    },
    assignee: [
      {
        id: 1,
        name: "Mr.Poum",
        image: image.poum,
      },
    ],
    supporter: [
      {
        id: 6,
        name: "Another Herta",
        image: image.herta,
      },
    ],
    reviewer: [
      {
        id: 5,
        name: "Stellaron Hunta",
        image: image.kafka,
      },
    ],
  },
  {
    id: 10,
    name: "How to land a job in Hoyoverse?",
    project: {
      id: 3,
      name: "ITSS :D?",
    },
    status: "in progress",
    priority: "high",
    completion: 20,
    start: new Date(2023, 7, 4, 17, 0, 0),
    end: new Date(2023, 7, 6, 18, 30, 0),
    creator: {
      id: 4,
      name: "Shogun Sama :))",
      image: image.jingyuan,
    },
    assignee: [
      {
        id: 1,
        name: "Mr.Poum",
        image: image.poum,
      },
    ],
    supporter: [
      {
        id: 6,
        name: "Another Herta",
        image: image.herta,
      },
    ],
    reviewer: [
      {
        id: 5,
        name: "Stellaron Hunta",
        image: image.kafka,
      },
    ],
  },
  {
    id: 11,
    name: "How to isekai to Genshit?",
    project: {
      id: 4,
      name: "GR2",
    },
    status: "in progress",
    priority: "high",
    completion: 20,
    start: new Date(2023, 7, 4, 9, 0, 0),
    end: new Date(2023, 7, 6, 21, 30, 0),
    creator: {
      id: 4,
      name: "Shogun Sama :))",
      image: image.jingyuan,
    },
    assignee: [
      {
        id: 1,
        name: "Mr.Poum",
        image: image.poum,
      },
    ],
    supporter: [
      {
        id: 6,
        name: "Another Herta",
        image: image.herta,
      },
    ],
    reviewer: [
      {
        id: 5,
        name: "Stellaron Hunta",
        image: image.kafka,
      },
    ],
  },
  {
    id: 12,
    name: "Make Honkai greate again",
    project: {
      id: 4,
      name: "GR2",
    },
    status: "in progress",
    priority: "high",
    completion: 20,
    start: new Date(2023, 7, 1, 6, 0, 0),
    end: new Date(2023, 7, 1, 17, 30, 0),
    creator: {
      id: 4,
      name: "Shogun Sama :))",
      image: image.jingyuan,
    },
    assignee: [
      {
        id: 1,
        name: "Mr.Poum",
        image: image.poum,
      },
    ],
    supporter: [
      {
        id: 6,
        name: "Another Herta",
        image: image.herta,
      },
    ],
    reviewer: [
      {
        id: 5,
        name: "Stellaron Hunta",
        image: image.kafka,
      },
    ],
  },
  {
    id: 13,
    name: "How to make fire?",
    project: {
      id: 5,
      name: "GR1",
    },
    status: "in progress",
    priority: "high",
    completion: 20,
    start: new Date(2023, 7, 1, 17, 0, 0),
    end: new Date(2023, 7, 10, 20, 30, 0),
    creator: {
      id: 4,
      name: "Shogun Sama :))",
      image: image.jingyuan,
    },
    assignee: [
      {
        id: 1,
        name: "Mr.Poum",
        image: image.poum,
      },
    ],
    supporter: [
      {
        id: 6,
        name: "Another Herta",
        image: image.herta,
      },
    ],
    reviewer: [
      {
        id: 5,
        name: "Stellaron Hunta",
        image: image.kafka,
      },
    ],
  },
];

const dummyWorkspacesData = [
  {
    name: 'School',
    pinned: true,
    tasks: [dummyTasksData],
    meets: [events],
    notes: [],
  },
  {
    name: 'Intern',
    pinned: false,
    tasks: [dummyTasksData],
    meets: [events],
    notes: [],
  },
  {
    name: 'Dating',
    pinned: true,
    tasks: [dummyTasksData],
    meets: [events],
    notes: [],
  },
  {
    name: 'Astral Express~~',
    pinned: true,
    tasks: [dummyTasksData],
    meets: [events],
    notes: [],
  },
  {
    name: ':D?',
    pinned: false,
    tasks: [dummyTasksData],
    meets: [events],
    notes: [],
  }
]

const dummyProjectsData = [
  {
    id: 1,
    name: "Project UI/UX",
    avatar: image.poum,
    tasks: dummyTasksData.slice(0, 6),
    progress: "in progress",
    members: [
      {
        id: 1,
        name: "Mr.Poum",
        image: image.poum,
        role: "Project Manager",
      },
      {
        id: 2,
        name: "Herta",
        image: image.kuru,
        role: "Developer",
      },
      {
        id: 3,
        name: "Himekooo",
        image: image.himeko,
        role: "Tester",
      },
      {
        id: 4,
        name: "Shogun Sama :))",
        image: image.jingyuan,
        role: "Do nothing",
      },
      {
        id: 5,
        name: "Stellaron Hunta",
        image: image.kafka,
        role: "Leaker",
      },
    ],
  },
  {
    id: 2,
    name: "Project AI",
    avatar: image.poum,
    progress: "in progress",
    tasks: dummyTasksData.slice(6, 9),
    members: [
      {
        id: 1,
        name: "Mr.Poum",
        image: image.poum,
        role: "Project Manager",
      },
      {
        id: 2,
        name: "Herta",
        image: image.kuru,
        role: "Developer",
      },
      {
        id: 3,
        name: "Himekooo",
        image: image.himeko,
        role: "Tester",
      },
      {
        id: 4,
        name: "Shogun Sama :))",
        image: image.jingyuan,
        role: "Do nothing",
      },
      {
        id: 5,
        name: "Stellaron Hunta",
        image: image.kafka,
        role: "Leaker",
      },
    ],
  },
  {
    id: 3,
    name: "ITSS :D?",
    avatar: image.poum,
    progress: "in progress",
    tasks: dummyTasksData.slice(9, 11),
    members: [
      {
        id: 1,
        name: "Mr.Poum",
        image: image.poum,
        role: "Project Manager",
      },
      {
        id: 2,
        name: "Herta",
        image: image.kuru,
        role: "Developer",
      },
      {
        id: 3,
        name: "Himekooo",
        image: image.himeko,
        role: "Tester",
      },
      {
        id: 4,
        name: "Shogun Sama :))",
        image: image.jingyuan,
        role: "Do nothing",
      },
      {
        id: 5,
        name: "Stellaron Hunta",
        image: image.kafka,
        role: "Leaker",
      },
    ],
  },
  {
    id: 4,
    name: "GR2",
    avatar: image.poum,
    progress: "in progress",
    tasks: dummyTasksData.slice(11, 13),
    members: [
      {
        id: 1,
        name: "Mr.Poum",
        image: image.poum,
        role: "Project Manager",
      },
      {
        id: 2,
        name: "Herta",
        image: image.kuru,
        role: "Developer",
      },
      {
        id: 3,
        name: "Himekooo",
        image: image.himeko,
        role: "Tester",
      },
      {
        id: 4,
        name: "Shogun Sama :))",
        image: image.jingyuan,
        role: "Do nothing",
      },
      {
        id: 5,
        name: "Stellaron Hunta",
        image: image.kafka,
        role: "Leaker",
      },
    ],
  },
  {
    id: 5,
    name: "GR1",
    avatar: image.poum,
    progress: "in progress",
    tasks: dummyTasksData.slice(12, ),
    members: [
      {
        id: 1,
        name: "Mr.Poum",
        image: image.poum,
        role: "Project Manager",
      },
      {
        id: 2,
        name: "Herta",
        image: image.kuru,
        role: "Developer",
      },
      {
        id: 3,
        name: "Himekooo",
        image: image.himeko,
        role: "Tester",
      },
      {
        id: 4,
        name: "Shogun Sama :))",
        image: image.jingyuan,
        role: "Do nothing",
      },
      {
        id: 5,
        name: "Stellaron Hunta",
        image: image.kafka,
        role: "Leaker",
      },
    ],
  },
];

const dummyTeamsData = [
  {
    id: 1,
    name: "Astral Express~",
    pinned: true,
    members: [
      {
        id: 1,
        name: "Mr.Poum",
        image: image.poum,
        role: "Team's Owner",
      },
      {
        id: 2,
        name: "Herta",
        image: image.kuru,
      },
      {
        id: 3,
        name: "Himekooo",
        image: image.himeko,
      },
      {
        id: 4,
        name: "Shogun Sama :))",
        image: image.jingyuan,
      },
      {
        id: 5,
        name: "Stellaron Hunta",
        image: image.kafka,
      },
    ],
    creator: {
      id: 1,
      name: "Mr.Poum",
      image: image.poum,
    },
    tasks: dummyTasksData.slice(0, 9),
    projects: [
      {
        id: 1,
        name: "Project UI/UX",
      },
      {
        id: 2,
        name: "Project AI",
      },
    ],
  },
  {
    id: 2,
    name: "Genshit",
    pinned: false,
    members: [
      {
        id: 1,
        name: "Mr.Poum",
        image: image.poum,
        role: "Team's Owner",
      },
      {
        id: 2,
        name: "Herta",
        image: image.kuru,
        role: "Member",
      },
      {
        id: 3,
        name: "Himekooo",
        image: image.himeko,
        role: "Member",
      },
      {
        id: 4,
        name: "Shogun Sama :))",
        image: image.jingyuan,
        role: "Member",
      },
      {
        id: 5,
        name: "Stellaron Hunta",
        image: image.kafka,
        role: "Member",
      },
    ],
    creator: {
      id: 1,
      name: "Mr.Poum",
      image: image.poum,
    },
    tasks: dummyTasksData.slice(0, 9),
    projects: [
      {
        id: 1,
        name: "Project UI/UX",
      },
      {
        id: 2,
        name: "Project AI",
      },
    ],
  },
  {
    id: 3,
    name: "Liyue",
    pinned: true,
    members: [
      {
        id: 1,
        name: "Mr.Poum",
        image: image.poum,
        role: "Team's Owner",
      },
      {
        id: 2,
        name: "Herta",
        image: image.kuru,
        role: "Member",
      },
      {
        id: 3,
        name: "Himekooo",
        image: image.himeko,
        role: "Member",
      },
      {
        id: 4,
        name: "Shogun Sama :))",
        image: image.jingyuan,
        role: "Member",
      },
      {
        id: 5,
        name: "Stellaron Hunta",
        image: image.kafka,
        role: "Member",
      },
    ],
    creator: {
      id: 1,
      name: "Mr.Poum",
      image: image.poum,
    },
    tasks: dummyTasksData.slice(0, 9),
    projects: [
      {
        id: 1,
        name: "Project UI/UX",
      },
      {
        id: 2,
        name: "Project AI",
      },
    ],
  },
  {
    id: 4,
    name: "Xiaozhou Luofu",
    pinned: true,
    members: [
      {
        id: 1,
        name: "Mr.Poum",
        image: image.poum,
        role: "Team's Owner",
      },
      {
        id: 2,
        name: "Herta",
        image: image.kuru,
        role: "Member",
      },
      {
        id: 3,
        name: "Himekooo",
        image: image.himeko,
        role: "Member",
      },
      {
        id: 4,
        name: "Shogun Sama :))",
        image: image.jingyuan,
        role: "Member",
      },
      {
        id: 5,
        name: "Stellaron Hunta",
        image: image.kafka,
        role: "Member",
      },
    ],
    creator: {
      id: 1,
      name: "Mr.Poum",
      image: image.poum,
    },
    tasks: dummyTasksData.slice(6),
    projects: [
      {
        id: 2,
        name: "Project AI",
      },
      {
        id: 3,
        name: "ITSS :D?",
      },
    ],
  },
  {
    id: 5,
    name: "Jarvio IV",
    pinned: true,
    members: [
      {
        id: 1,
        name: "Mr.Poum",
        image: image.poum,
        role: "Team's Owner",
      },
      {
        id: 2,
        name: "Herta",
        image: image.kuru,
        role: "Member",
      },
      {
        id: 3,
        name: "Himekooo",
        image: image.himeko,
        role: "Member",
      },
      {
        id: 4,
        name: "Shogun Sama :))",
        image: image.jingyuan,
        role: "Member",
      },
      {
        id: 5,
        name: "Stellaron Hunta",
        image: image.kafka,
        role: "Member",
      },
    ],
    creator: {
      id: 1,
      name: "Mr.Poum",
      image: image.poum,
    },
    tasks: dummyTasksData,
    projects: [
      {
        id: 1,
        name: "Project UI/UX",
      },
      {
        id: 2,
        name: "Project AI",
      },
      {
        id: 3,
        name: "ITSS :D?",
      },
    ],
  },
];

const dummyMeetsData = [
  {
    title: "Meeting with the Rock",
    start: dayjs(new Date() + 1),
    end: dayjs(new Date() + 2),
    priority: 'high',
    status: 'done',
    creator: {
      name: "Mr.Poum",
      image: image.poum,
    },
    members: [
      {
        name: 'JingYuan',
        image: image.jingyuan,
      },
      {
        name: 'Himeko',
        image: image.himeko,
      },
      {
        name: 'Kafka',
        image: image.kafka,
      },
    ]
  },
  {
    title: "Meeting with the Mr.Poum",
    start: dayjs(new Date() + 3),
    end: dayjs(new Date() + 15),
    priority: 'medium',
    status: 'in progress',
    creator: {
      name: "Mr.Poum",
      image: image.poum,
    },
    members: [
      {
        name: 'JingYuan',
        image: image.jingyuan,
      },
      {
        name: 'Himeko',
        image: image.himeko,
      },
      {
        name: 'Kafka',
        image: image.kafka,
      },
    ]
  },
  {
    title: "Meeting with the Ramu",
    start: dayjs(new Date() + 4),
    end: dayjs(new Date() + 8),
    priority: 'high',
    status: 'done',
    creator: {
      name: "Mr.Poum",
      image: image.poum,
    },
    members: [
      {
        name: 'JingYuan',
        image: image.jingyuan,
      },
      {
        name: 'Himeko',
        image: image.himeko,
      },
      {
        name: 'Kafka',
        image: image.kafka,
      },
    ]
  },
  {
    title: "Meeting with the Rock",
    start: dayjs(new Date() + 3),
    end: dayjs(new Date() + 5),
    priority: 'high',
    status: 'done',
    creator: {
      name: "Mr.Poum",
      image: image.poum,
    },
    members: [
      {
        name: 'JingYuan',
        image: image.jingyuan,
      },
      {
        name: 'Himeko',
        image: image.himeko,
      },
      {
        name: 'Kafka',
        image: image.kafka,
      },
    ]
  },
  {
    title: "Meeting with the Shogun sama",
    start: dayjs(new Date() + 0),
    end: dayjs(new Date() + 2),
    priority: 'high',
    status: 'done',
    creator: {
      name: "Mr.Poum",
      image: image.poum,
    },
    members: [
      {
        name: 'JingYuan',
        image: image.jingyuan,
      },
      {
        name: 'Himeko',
        image: image.himeko,
      },
      {
        name: 'Kafka',
        image: image.kafka,
      },
    ]
  },
  {
    title: "Meeting with the Aliki",
    start: dayjs(new Date() - 30),
    end: dayjs(new Date() + 30),
    priority: 'high',
    status: 'done',
    creator: {
      name: "Mr.Poum",
      image: image.poum,
    },
    members: [
      {
        name: 'JingYuan',
        image: image.jingyuan,
      },
      {
        name: 'Himeko',
        image: image.himeko,
      },
      {
        name: 'Kafka',
        image: image.kafka,
      },
    ]
  },
  {
    title: "Meeting with the Rock",
    start: dayjs(new Date()),
    end: dayjs(new Date() + 10),
    priority: 'high',
    status: 'done',
    creator: {
      name: "Mr.Poum",
      image: image.poum,
    },
    members: [
      {
        name: 'JingYuan',
        image: image.jingyuan,
      },
      {
        name: 'Himeko',
        image: image.himeko,
      },
      {
        name: 'Kafka',
        image: image.kafka,
      },
    ]
  },
  {
    title: "Meeting with the Rock",
    start: dayjs(new Date() - 1),
    end: dayjs(new Date() + 1),
    priority: 'high',
    status: 'done',
    creator: {
      id: 1,
      name: "Mr.Poum",
      image: image.poum,
    },
    members: [
      {
        id: 2,
        name: 'JingYuan',
        image: image.jingyuan,
      },
      {
        id: 3,
        name: 'Himeko',
        image: image.himeko,
      },
      {
        id: 4,
        name: 'Kafka',
        image: image.kafka,
      },
    ]
  },
  {
    id: 1,
    title: "Meeting with the Rock",
    start: dayjs(),
    end: dayjs(),
    priority: 'high',
    status: 'done',
    creator: {
      id: 1,
      name: "Mr.Poum",
      image: image.poum,
    },
    members: [
      {
        id: 2,
        name: 'JingYuan',
        image: image.jingyuan,
      },
      {
        id: 3,
        name: 'Himeko',
        image: image.himeko,
      },
      {
        id: 4,
        name: 'Kafka',
        image: image.kafka,
      },
    ]
  },
  {
    id: 1,
    title: "Meeting with the Rock",
    start: dayjs(),
    end: dayjs(),
    priority: 'high',
    status: 'done',
    creator: {
      id: 1,
      name: "Mr.Poum",
      image: image.poum,
    },
    members: [
      {
        id: 2,
        name: 'JingYuan',
        image: image.jingyuan,
      },
      {
        id: 3,
        name: 'Himeko',
        image: image.himeko,
      },
      {
        id: 4,
        name: 'Kafka',
        image: image.kafka,
      },
    ]
  },
  {
    id: 1,
    title: "Meeting with the Rock",
    start: dayjs(),
    end: dayjs(),
    priority: 'high',
    status: 'done',
    creator: {
      id: 1,
      name: "Mr.Poum",
      image: image.poum,
    },
    members: [
      {
        id: 2,
        name: 'JingYuan',
        image: image.jingyuan,
      },
      {
        id: 3,
        name: 'Himeko',
        image: image.himeko,
      },
      {
        id: 4,
        name: 'Kafka',
        image: image.kafka,
      },
    ]
  },
];

const dummyUsersData = [
  {
    id: 1,
    email: "abc@gmail.com",
    password: "abc123",
    name: "Mr.Poum",
    image: image.poum,
    teams: [
      {
        id: 1,
        name: "Astral Express~",
      },
      {
        id: 2,
        name: "Monke Gang",
      },
      {
        id: 3,
        name: "SpaceX",
      },
      {
        id: 4,
        name: "Hoyoverse",
      },
      {
        id: 5,
        name: "Apple",
      },
    ],
    notes: [],
    tasks: [],
    meets: [],
  },
  {
    id: 2,
    email: "abcd@gmail.com",
    password: "abcd123",
    name: "Herta",
    image: image.kuru,
    teams: [
      {
        id: 1,
        name: "Astral Express~",
      },
      {
        id: 2,
        name: "Monke Gang",
      },
      {
        id: 3,
        name: "SpaceX",
      },
      {
        id: 4,
        name: "Hoyoverse",
      },
      {
        id: 5,
        name: "Apple",
      },
    ],
    notes: [],
    tasks: [],
    meets: [],
  },
  {
    id: 3,
    email: "abcde@gmail.com",
    password: "abcde123",
    name: "Himekooo",
    image: image.himeko,
    teams: [
      {
        id: 1,
        name: "Astral Express~",
      },
      {
        id: 2,
        name: "Monke Gang",
      },
      {
        id: 3,
        name: "SpaceX",
      },
      {
        id: 4,
        name: "Hoyoverse",
      },
      {
        id: 5,
        name: "Apple",
      },
    ],
    notes: [],
    tasks: [],
    meets: [],
  },
  {
    id: 4,
    email: "abcdef@gmail.com",
    password: "abcdef123",
    name: "Shogun Sama :))",
    image: image.jingyuan,
    teams: [
      {
        id: 1,
        name: "Astral Express~",
      },
      {
        id: 2,
        name: "Monke Gang",
      },
      {
        id: 3,
        name: "SpaceX",
      },
      {
        id: 4,
        name: "Hoyoverse",
      },
      {
        id: 5,
        name: "Apple",
      },
    ],
    notes: [],
    tasks: [],
    meets: [],
  },
  {
    id: 5,
    email: "abcdefg@gmail.com",
    password: "abcdefg123",
    name: "Stellaron Hunta",
    image: image.kafka,
    teams: [
      {
        id: 1,
        name: "Astral Express~",
      },
      {
        id: 2,
        name: "Monke Gang",
      },
      {
        id: 3,
        name: "SpaceX",
      },
      {
        id: 4,
        name: "Hoyoverse",
      },
      {
        id: 5,
        name: "Apple",
      },
    ],
    notes: [],
    tasks: [],
    meets: [],
  },
  {
    id: 6,
    email: "abcdefgh@gmail.com",
    password: "abcdefgh123",
    name: "Another Herta",
    image: image.herta,
    teams: [
      {
        id: 1,
        name: "Astral Express~",
      },
      {
        id: 2,
        name: "Monke Gang",
      },
      {
        id: 3,
        name: "SpaceX",
      },
      {
        id: 4,
        name: "Hoyoverse",
      },
      {
        id: 5,
        name: "Apple",
      },
    ],
    notes: [],
    tasks: [],
    meets: [],
  },
];

export default {
  dummyTeamsData,
  dummyProjectsData,
  dummyWorkspacesData,
  dummyTasksData,
  dummyUsersData,
  dummyMeetsData,
};
