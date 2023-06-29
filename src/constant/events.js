// const now = new Date()
// import dayjs from "dayjs";
import image from "./image";

export default [
  {
    id: 0,
    title: 'All Day Event very long title',
    allDay: true,
    start: new Date(2023, 7, 1, 17, 0, 0),
    end: new Date(2023, 7, 2, 18, 30, 0),
    priority: 'High',
    status: 'Done',
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
    id: 1,
    title: 'Long Event',
    start: new Date(2023, 7, 1, 0, 0, 0),
    end: new Date(2023, 9, 1, 24, 0, 0),
    priority: 'High',
    status: 'Done',
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
    id: 2,
    title: 'DTS STARTS',
    start: new Date(2023, 8, 1, 19, 0, 0),
    end: new Date(2023, 9, 10, 19, 30, 0),
    priority: 'High',
    status: 'Done',
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
    id: 3,
    title: 'DTS ENDS',
    start: new Date(2023, 8, 10, 17, 0, 0),
    end: new Date(2023, 8, 21, 18, 30, 0),
    priority: 'High',
    status: 'Done',
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
    id: 4,
    title: 'To Japan!',
    start: new Date(2023, 9, 12, 0, 0, 0),
    end: new Date(2023, 9, 15, 23, 59, 0),
    priority: 'High',
    status: 'Done',
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
    id: 5,
    title: 'Conference',
    start: new Date(2023, 8, 9, 17, 0, 0),
    end: new Date(2023, 8, 10, 18, 30, 0),
    desc: 'Big conference for important people',
    priority: 'High',
    status: 'Done',
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
    id: 6,
    title: 'Meeting',
    start: new Date(2023, 9, 6, 17, 0, 0),
    end: new Date(2023, 9, 9, 18, 30, 0),
    desc: 'Pre-meeting meeting, to prepare for the meeting',
    priority: 'High',
    status: 'Done',
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
    id: 7,
    title: 'Lunch',
    start: new Date(2023, 7, 1, 12, 0, 0),
    end: new Date(2023, 7, 29, 12, 30, 0),
    desc: 'Power lunch',
    priority: 'High',
    status: 'Done',
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
    id: 8,
    title: 'Meeting',
    start: new Date(2023, 7, 1, 17, 0, 0),
    end: new Date(2023, 7, 10, 18, 30, 0),
    priority: 'High',
    status: 'Done',
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
    id: 9,
    title: 'Happy Hour',
    start: new Date(2023, 9, 21, 0, 0, 0),
    end: new Date(2023, 9, 21, 24, 30, 0),
    desc: 'Most important meal of the day',
    priority: 'High',
    status: 'Done',
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
    id: 10,
    title: 'Dinner',
    start: new Date(2023, 7, 1, 17, 0, 0),
    end: new Date(2023, 7, 3, 19, 30, 0),
    priority: 'High',
    status: 'Done',
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
    id: 11,
    title: 'Planning Meeting with Paige',
    start: new Date(2023, 7, 1, 17, 0, 0),
    end: new Date(2023, 7, 5, 18, 30, 0),
    priority: 'High',
    status: 'Done',
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
    id: 11.1,
    title: 'Inconvenient Conference Call',
    start: new Date(2023, 7, 1, 17, 0, 0),
    end: new Date(2023, 7, 10, 20, 30, 0),
    priority: 'High',
    status: 'Done',
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
    id: 11.2,
    title: "Project Kickoff - Lou's Shoes",
    start: new Date(2023, 7, 1, 6, 0, 0),
    end: new Date(2023, 7, 1, 17, 30, 0),
    priority: 'High',
    status: 'Done',
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
    id: 11.3,
    title: 'Quote Follow-up - Tea by Tina',
    start: new Date(2023, 7, 4, 9, 0, 0),
    end: new Date(2023, 7, 6, 21, 30, 0),
    priority: 'High',
    status: 'Done',
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
    id: 12,
    title: 'Late Night Event',
    start: new Date(2023, 8, 1, 16, 0, 0),
    end: new Date(2023, 8, 10, 20, 30, 0),
    priority: 'High',
    status: 'Done',
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
    id: 12.5,
    title: 'Late Same Night Event',
    start: new Date(2023, 7, 4, 17, 0, 0),
    end: new Date(2023, 7, 6, 18, 30, 0),
    priority: 'High',
    status: 'Done',
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
    id: 13,
    title: 'Multi-day Event',
    start: new Date(2023, 7, 1, 10, 0, 0),
    end: new Date(2023, 7, 2, 18, 30, 0),
    priority: 'High',
    status: 'Done',
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
    id: 14,
    title: 'Today',
    start: new Date(new Date().setHours(new Date().getHours() - 3)),
    end: new Date(new Date().setHours(new Date().getHours() + 3)),
    priority: 'High',
    status: 'Done',
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
    id: 15,
    title: 'Point in Time Event',
    start: new Date(2023, 7, 6, 14, 0, 0),
    end: new Date(2023, 7, 9, 18, 30, 0),
    priority: 'High',
    status: 'Done',
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
    id: 16,
    title: 'Video Record',
    start: new Date(new Date().setHours(new Date().getHours() - 4)),
    end: new Date(new Date().setHours(new Date().getHours() + 2)),
    priority: 'High',
    status: 'Done',
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
    id: 17,
    title: 'Dutch Song Producing',
    start: new Date(new Date().setHours(new Date().getHours() - 1)),
    end: new Date(new Date().setHours(new Date().getHours() + 1)),
    priority: 'High',
    status: 'Done',
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
    id: 18,
    title: 'Itaewon Halloween Meeting',
    start: new Date(new Date().setHours(new Date().getHours() - 2)),
    end: new Date(new Date().setHours(new Date().getHours() + 3)),
    priority: 'High',
    status: 'Done',
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
    id: 19,
    title: 'Online Coding Test',
    start: new Date(new Date().setHours(new Date().getHours() - 1)),
    end: new Date(new Date().setHours(new Date().getHours() + 6)),
    priority: 'High',
    status: 'Done',
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
    id: 20,
    title: 'An overlapped Event',
    start: new Date(2023, 8, 15, 1, 0, 0),
    end: new Date(2023, 8, 22, 23, 30, 0),
    priority: 'High',
    status: 'Done',
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
    id: 21,
    title: 'Phone Interview',
    start: new Date(2023, 7, 1, 17, 0, 0),
    end: new Date(2023, 7, 5, 18, 30, 0),
    priority: 'High',
    status: 'Done',
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
    id: 22,
    title: 'Cooking Class',
    start: new Date(2023, 7, 1, 17, 0, 0),
    end: new Date(2023, 7, 10, 18, 30, 0),
    priority: 'High',
    status: 'Done',
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
    id: 23,
    title: 'Go to the gym',
    start: new Date(2023, 7, 4, 17, 0, 0),
    end: new Date(2023, 7, 5, 18, 30, 0),
    priority: 'High',
    status: 'Done',
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
    id: 24,
    title: 'DST ends on this day (Europe)',
    start: new Date(2023, 7, 10, 17, 0, 0),
    end: new Date(2023, 7, 20, 18, 30, 0),
    priority: 'High',
    status: 'Done',
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
    id: 25,
    title: 'DST ends on this day (America)',
    start: new Date(2023, 7, 1, 17, 0, 0),
    end: new Date(2023, 7, 5, 18, 30, 0),
    priority: 'High',
    status: 'Done',
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
    id: 26,
    title: 'DST starts on this day (America)',
    start: new Date(2023, 7, 28, 17, 0, 0),
    end: new Date(2023, 7, 29, 18, 30, 0),
    priority: 'High',
    status: 'Done',
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
    id: 27,
    title: 'DST starts on this day (Europe)',
    start: new Date(2023, 7, 4, 17, 0, 0),
    end: new Date(2023, 7, 12, 18, 30, 0),
    priority: 'High',
    status: 'Done',
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
]