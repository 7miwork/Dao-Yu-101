export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface LessonQuiz {
  lessonId: number;
  lessonTitle: string;
  questions: QuizQuestion[];
  passingScore: number; // percentage (e.g., 70)
  xpReward: number;
}

export const quizzes: Record<number, LessonQuiz> = {
  1: {
    lessonId: 1,
    lessonTitle: 'Introduction to Minecraft Education',
    passingScore: 70,
    xpReward: 100,
    questions: [
      {
        id: 'q1-1',
        question: 'What is Minecraft Education Edition designed for?',
        options: [
          'Only for entertainment',
          'Educational learning and classroom activities',
          'Professional game development',
          'Creating commercial games'
        ],
        correctAnswer: 1,
        explanation: 'Minecraft Education Edition is specifically designed for educational purposes and classroom activities.',
        difficulty: 'easy'
      },
      {
        id: 'q1-2',
        question: 'Which of the following is a key feature of Minecraft Education?',
        options: [
          'Unlimited creative building',
          'Classroom management tools and collaborative features',
          'Professional graphics rendering',
          'Multiplayer battle royale'
        ],
        correctAnswer: 1,
        explanation: 'Minecraft Education includes classroom management tools and collaborative learning features.',
        difficulty: 'easy'
      },
      {
        id: 'q1-3',
        question: 'How can Minecraft Education be used in learning?',
        options: [
          'Only for art classes',
          'For STEM subjects, history, language arts, and more',
          'Only for computer science',
          'It cannot be used for learning'
        ],
        correctAnswer: 1,
        explanation: 'Minecraft Education can be used across multiple subjects including STEM, history, language arts, and more.',
        difficulty: 'medium'
      }
    ]
  },
  2: {
    lessonId: 2,
    lessonTitle: 'Basic Building Blocks',
    passingScore: 70,
    xpReward: 100,
    questions: [
      {
        id: 'q2-1',
        question: 'What is the basic unit of construction in Minecraft?',
        options: [
          'Pixels',
          'Blocks',
          'Voxels',
          'Cubes'
        ],
        correctAnswer: 1,
        explanation: 'Blocks are the basic units of construction in Minecraft.',
        difficulty: 'easy'
      },
      {
        id: 'q2-2',
        question: 'Which block is commonly used for building structures?',
        options: [
          'Water block',
          'Air block',
          'Stone block',
          'Void block'
        ],
        correctAnswer: 2,
        explanation: 'Stone blocks are commonly used for building durable structures.',
        difficulty: 'easy'
      },
      {
        id: 'q2-3',
        question: 'How many blocks can you typically place in a single action?',
        options: [
          'One block at a time',
          'Multiple blocks simultaneously',
          'Unlimited blocks',
          'No blocks can be placed'
        ],
        correctAnswer: 0,
        explanation: 'In Minecraft, you typically place one block at a time, though tools can help place multiple blocks.',
        difficulty: 'medium'
      }
    ]
  },
  3: {
    lessonId: 3,
    lessonTitle: 'Loops & Repetition',
    passingScore: 75,
    xpReward: 150,
    questions: [
      {
        id: 'q3-1',
        question: 'What is a loop in programming?',
        options: [
          'A circular shape',
          'A way to repeat code multiple times',
          'A type of variable',
          'A debugging tool'
        ],
        correctAnswer: 1,
        explanation: 'A loop is a programming construct that repeats a block of code multiple times.',
        difficulty: 'easy'
      },
      {
        id: 'q3-2',
        question: 'Which type of loop repeats a specific number of times?',
        options: [
          'While loop',
          'For loop',
          'Do-while loop',
          'Infinite loop'
        ],
        correctAnswer: 1,
        explanation: 'A for loop repeats a specific number of times based on a counter.',
        difficulty: 'medium'
      },
      {
        id: 'q3-3',
        question: 'What happens if you create an infinite loop?',
        options: [
          'The program stops immediately',
          'The program repeats forever until stopped',
          'The program runs faster',
          'The program automatically fixes itself'
        ],
        correctAnswer: 1,
        explanation: 'An infinite loop repeats forever until the program is manually stopped or interrupted.',
        difficulty: 'medium'
      },
      {
        id: 'q3-4',
        question: 'How can loops help in Minecraft building?',
        options: [
          'They cannot help with building',
          'They allow you to repeat building commands efficiently',
          'They only work for mining',
          'They are used for decoration only'
        ],
        correctAnswer: 1,
        explanation: 'Loops allow you to repeat building commands efficiently, saving time and effort.',
        difficulty: 'hard'
      }
    ]
  },
  4: {
    lessonId: 4,
    lessonTitle: 'Conditional Logic',
    passingScore: 75,
    xpReward: 150,
    questions: [
      {
        id: 'q4-1',
        question: 'What is conditional logic?',
        options: [
          'Logic that is always true',
          'Logic that makes decisions based on conditions',
          'Logic that is never used',
          'Logic that is random'
        ],
        correctAnswer: 1,
        explanation: 'Conditional logic makes decisions based on whether conditions are true or false.',
        difficulty: 'easy'
      },
      {
        id: 'q4-2',
        question: 'What is an if statement?',
        options: [
          'A type of loop',
          'A statement that executes code if a condition is true',
          'A variable declaration',
          'A function definition'
        ],
        correctAnswer: 1,
        explanation: 'An if statement executes a block of code only if a specified condition is true.',
        difficulty: 'easy'
      },
      {
        id: 'q4-3',
        question: 'What does the else clause do?',
        options: [
          'It repeats code',
          'It executes if the if condition is false',
          'It declares variables',
          'It creates loops'
        ],
        correctAnswer: 1,
        explanation: 'The else clause executes a block of code if the if condition is false.',
        difficulty: 'medium'
      },
      {
        id: 'q4-4',
        question: 'How can conditionals be used in Minecraft?',
        options: [
          'They cannot be used',
          'To check player location and execute different commands',
          'Only for decoration',
          'To slow down the game'
        ],
        correctAnswer: 1,
        explanation: 'Conditionals can check player location and other conditions to execute different commands.',
        difficulty: 'hard'
      }
    ]
  },
  5: {
    lessonId: 5,
    lessonTitle: 'Functions & Methods',
    passingScore: 75,
    xpReward: 150,
    questions: [
      {
        id: 'q5-1',
        question: 'What is a function?',
        options: [
          'A type of variable',
          'A reusable block of code that performs a specific task',
          'A loop structure',
          'A conditional statement'
        ],
        correctAnswer: 1,
        explanation: 'A function is a reusable block of code that performs a specific task.',
        difficulty: 'easy'
      },
      {
        id: 'q5-2',
        question: 'Why are functions useful?',
        options: [
          'They make code longer',
          'They reduce code duplication and improve readability',
          'They slow down programs',
          'They are not useful'
        ],
        correctAnswer: 1,
        explanation: 'Functions reduce code duplication and make code more readable and maintainable.',
        difficulty: 'medium'
      },
      {
        id: 'q5-3',
        question: 'What are parameters in a function?',
        options: [
          'The return value',
          'Inputs that a function receives',
          'The function name',
          'The function body'
        ],
        correctAnswer: 1,
        explanation: 'Parameters are inputs that a function receives to perform its task.',
        difficulty: 'medium'
      },
      {
        id: 'q5-4',
        question: 'What does a return statement do?',
        options: [
          'It stops the program',
          'It sends a value back to the caller',
          'It creates a loop',
          'It declares a variable'
        ],
        correctAnswer: 1,
        explanation: 'A return statement sends a value back to the code that called the function.',
        difficulty: 'hard'
      }
    ]
  },
  6: {
    lessonId: 6,
    lessonTitle: 'Variables & Data Types',
    passingScore: 70,
    xpReward: 100,
    questions: [
      {
        id: 'q6-1',
        question: 'What is a variable?',
        options: [
          'A fixed value',
          'A named container that stores data',
          'A function',
          'A loop'
        ],
        correctAnswer: 1,
        explanation: 'A variable is a named container that stores data values.',
        difficulty: 'easy'
      },
      {
        id: 'q6-2',
        question: 'What is a data type?',
        options: [
          'A variable name',
          'The category of data a variable can hold',
          'A function parameter',
          'A loop structure'
        ],
        correctAnswer: 1,
        explanation: 'A data type specifies the category of data a variable can hold (e.g., number, text, boolean).',
        difficulty: 'easy'
      },
      {
        id: 'q6-3',
        question: 'Which of these is a valid data type?',
        options: [
          'Function',
          'Loop',
          'Integer',
          'Conditional'
        ],
        correctAnswer: 2,
        explanation: 'Integer is a valid data type representing whole numbers.',
        difficulty: 'medium'
      }
    ]
  },
  7: {
    lessonId: 7,
    lessonTitle: 'Arrays & Lists',
    passingScore: 75,
    xpReward: 150,
    questions: [
      {
        id: 'q7-1',
        question: 'What is an array?',
        options: [
          'A single value',
          'A collection of elements stored in a single variable',
          'A function',
          'A loop'
        ],
        correctAnswer: 1,
        explanation: 'An array is a collection of elements stored in a single variable.',
        difficulty: 'easy'
      },
      {
        id: 'q7-2',
        question: 'How do you access an element in an array?',
        options: [
          'By its name',
          'By its index (position)',
          'By its type',
          'By its value'
        ],
        correctAnswer: 1,
        explanation: 'Array elements are accessed by their index, which represents their position.',
        difficulty: 'medium'
      },
      {
        id: 'q7-3',
        question: 'What is the first index of an array typically?',
        options: [
          '1',
          '0',
          '-1',
          'undefined'
        ],
        correctAnswer: 1,
        explanation: 'In most programming languages, array indexing starts at 0.',
        difficulty: 'medium'
      }
    ]
  },
  8: {
    lessonId: 8,
    lessonTitle: 'Event Handling',
    passingScore: 70,
    xpReward: 100,
    questions: [
      {
        id: 'q8-1',
        question: 'What is an event?',
        options: [
          'A function',
          'Something that happens in the program (like a click or key press)',
          'A variable',
          'A loop'
        ],
        correctAnswer: 1,
        explanation: 'An event is something that happens in the program, such as a user action.',
        difficulty: 'easy'
      },
      {
        id: 'q8-2',
        question: 'What is event handling?',
        options: [
          'Ignoring events',
          'Responding to events with code',
          'Creating events',
          'Deleting events'
        ],
        correctAnswer: 1,
        explanation: 'Event handling is the process of responding to events with code.',
        difficulty: 'medium'
      },
      {
        id: 'q8-3',
        question: 'Which is a common event in Minecraft?',
        options: [
          'Player login',
          'Block placement',
          'Player movement',
          'All of the above'
        ],
        correctAnswer: 3,
        explanation: 'All of these are common events in Minecraft that can be handled.',
        difficulty: 'medium'
      }
    ]
  },
  9: {
    lessonId: 9,
    lessonTitle: 'Error Handling',
    passingScore: 75,
    xpReward: 150,
    questions: [
      {
        id: 'q9-1',
        question: 'What is an error in programming?',
        options: [
          'A feature',
          'A mistake or problem in code',
          'A loop',
          'A variable'
        ],
        correctAnswer: 1,
        explanation: 'An error is a mistake or problem in code that prevents it from working correctly.',
        difficulty: 'easy'
      },
      {
        id: 'q9-2',
        question: 'What is error handling?',
        options: [
          'Ignoring errors',
          'Managing and responding to errors gracefully',
          'Creating errors',
          'Deleting errors'
        ],
        correctAnswer: 1,
        explanation: 'Error handling is managing and responding to errors gracefully.',
        difficulty: 'medium'
      },
      {
        id: 'q9-3',
        question: 'What does a try-catch block do?',
        options: [
          'It creates a loop',
          'It attempts code and catches errors if they occur',
          'It declares variables',
          'It defines functions'
        ],
        correctAnswer: 1,
        explanation: 'A try-catch block attempts to execute code and catches any errors that occur.',
        difficulty: 'hard'
      }
    ]
  },
  10: {
    lessonId: 10,
    lessonTitle: 'Object-Oriented Programming',
    passingScore: 80,
    xpReward: 200,
    questions: [
      {
        id: 'q10-1',
        question: 'What is an object in OOP?',
        options: [
          'A variable',
          'A collection of properties and methods',
          'A function',
          'A loop'
        ],
        correctAnswer: 1,
        explanation: 'An object is a collection of properties (data) and methods (functions).',
        difficulty: 'medium'
      },
      {
        id: 'q10-2',
        question: 'What is a class?',
        options: [
          'An object',
          'A blueprint for creating objects',
          'A function',
          'A variable'
        ],
        correctAnswer: 1,
        explanation: 'A class is a blueprint or template for creating objects.',
        difficulty: 'medium'
      },
      {
        id: 'q10-3',
        question: 'What is inheritance in OOP?',
        options: [
          'Copying code',
          'A class inheriting properties from another class',
          'Creating variables',
          'Defining functions'
        ],
        correctAnswer: 1,
        explanation: 'Inheritance allows a class to inherit properties and methods from another class.',
        difficulty: 'hard'
      },
      {
        id: 'q10-4',
        question: 'What is encapsulation?',
        options: [
          'Wrapping data in loops',
          'Bundling data and methods together and hiding internal details',
          'Creating arrays',
          'Defining functions'
        ],
        correctAnswer: 1,
        explanation: 'Encapsulation is bundling data and methods together and hiding internal details.',
        difficulty: 'hard'
      }
    ]
  },
  11: {
    lessonId: 11,
    lessonTitle: 'Advanced Building Techniques',
    passingScore: 75,
    xpReward: 150,
    questions: [
      {
        id: 'q11-1',
        question: 'What is a structure in Minecraft building?',
        options: [
          'A single block',
          'A complex arrangement of blocks forming a design',
          'A type of block',
          'A game mode'
        ],
        correctAnswer: 1,
        explanation: 'A structure is a complex arrangement of blocks forming a design or building.',
        difficulty: 'easy'
      },
      {
        id: 'q11-2',
        question: 'What are redstone circuits used for?',
        options: [
          'Decoration only',
          'Creating mechanical and electrical systems',
          'Building walls',
          'Mining blocks'
        ],
        correctAnswer: 1,
        explanation: 'Redstone circuits are used to create mechanical and electrical systems in Minecraft.',
        difficulty: 'medium'
      },
      {
        id: 'q11-3',
        question: 'How can you automate building tasks?',
        options: [
          'You cannot automate',
          'Using commands and programming',
          'By building faster',
          'By using more blocks'
        ],
        correctAnswer: 1,
        explanation: 'Building tasks can be automated using commands and programming.',
        difficulty: 'hard'
      }
    ]
  },
  12: {
    lessonId: 12,
    lessonTitle: 'Maze Navigation',
    passingScore: 70,
    xpReward: 100,
    questions: [
      {
        id: 'q12-1',
        question: 'What is pathfinding?',
        options: [
          'Walking randomly',
          'Finding the optimal path from start to goal',
          'Building walls',
          'Decorating'
        ],
        correctAnswer: 1,
        explanation: 'Pathfinding is finding the optimal path from a starting point to a goal.',
        difficulty: 'medium'
      },
      {
        id: 'q12-2',
        question: 'What algorithm can be used for maze solving?',
        options: [
          'Random walk',
          'Depth-first search (DFS)',
          'Breadth-first search (BFS)',
          'All of the above'
        ],
        correctAnswer: 3,
        explanation: 'Multiple algorithms including DFS, BFS, and others can solve mazes.',
        difficulty: 'hard'
      },
      {
        id: 'q12-3',
        question: 'How can you navigate a maze efficiently?',
        options: [
          'By guessing',
          'By using algorithms and logic',
          'By trying every path',
          'Mazes cannot be solved'
        ],
        correctAnswer: 1,
        explanation: 'Mazes can be navigated efficiently using algorithms and logical thinking.',
        difficulty: 'medium'
      }
    ]
  },
  13: {
    lessonId: 13,
    lessonTitle: 'Village Design',
    passingScore: 70,
    xpReward: 100,
    questions: [
      {
        id: 'q13-1',
        question: 'What elements make up a village?',
        options: [
          'Only houses',
          'Houses, farms, roads, and community buildings',
          'Only farms',
          'Only roads'
        ],
        correctAnswer: 1,
        explanation: 'A village includes houses, farms, roads, and various community buildings.',
        difficulty: 'easy'
      },
      {
        id: 'q13-2',
        question: 'What is urban planning?',
        options: [
          'Random building placement',
          'Organizing space for functionality and aesthetics',
          'Building as fast as possible',
          'Building only houses'
        ],
        correctAnswer: 1,
        explanation: 'Urban planning involves organizing space for functionality and aesthetics.',
        difficulty: 'medium'
      },
      {
        id: 'q13-3',
        question: 'How can you make a village sustainable?',
        options: [
          'By adding more blocks',
          'By planning resources, farming, and infrastructure',
          'By removing all trees',
          'Villages cannot be sustainable'
        ],
        correctAnswer: 1,
        explanation: 'Sustainability involves planning resources, farming, and infrastructure.',
        difficulty: 'hard'
      }
    ]
  },
  14: {
    lessonId: 14,
    lessonTitle: 'Challenge Solving',
    passingScore: 75,
    xpReward: 150,
    questions: [
      {
        id: 'q14-1',
        question: 'What is problem-solving?',
        options: [
          'Ignoring problems',
          'Analyzing and finding solutions to challenges',
          'Creating problems',
          'Avoiding challenges'
        ],
        correctAnswer: 1,
        explanation: 'Problem-solving is analyzing and finding solutions to challenges.',
        difficulty: 'easy'
      },
      {
        id: 'q14-2',
        question: 'What is the first step in solving a challenge?',
        options: [
          'Start coding immediately',
          'Understand the problem',
          'Give up',
          'Ask for the answer'
        ],
        correctAnswer: 1,
        explanation: 'The first step is to understand the problem clearly.',
        difficulty: 'medium'
      },
      {
        id: 'q14-3',
        question: 'What is debugging?',
        options: [
          'Writing code',
          'Finding and fixing errors in code',
          'Running code',
          'Deleting code'
        ],
        correctAnswer: 1,
        explanation: 'Debugging is finding and fixing errors in code.',
        difficulty: 'medium'
      },
      {
        id: 'q14-4',
        question: 'How can you approach complex challenges?',
        options: [
          'Try random solutions',
          'Break them into smaller parts and solve systematically',
          'Give up immediately',
          'Ask someone else to solve it'
        ],
        correctAnswer: 1,
        explanation: 'Complex challenges are best approached by breaking them into smaller parts.',
        difficulty: 'hard'
      }
    ]
  },
  15: {
    lessonId: 15,
    lessonTitle: 'Final Project & Showcase',
    passingScore: 80,
    xpReward: 250,
    questions: [
      {
        id: 'q15-1',
        question: 'What skills have you learned in this course?',
        options: [
          'Only building',
          'Building, programming, problem-solving, and design',
          'Only programming',
          'No skills'
        ],
        correctAnswer: 1,
        explanation: 'This course covers building, programming, problem-solving, and design skills.',
        difficulty: 'easy'
      },
      {
        id: 'q15-2',
        question: 'What is the purpose of a final project?',
        options: [
          'To waste time',
          'To demonstrate and apply learned skills',
          'To test the teacher',
          'Projects are not useful'
        ],
        correctAnswer: 1,
        explanation: 'A final project demonstrates and applies the skills learned throughout the course.',
        difficulty: 'medium'
      },
      {
        id: 'q15-3',
        question: 'How can you showcase your project?',
        options: [
          'Keep it private',
          'Share with others and present your work',
          'Delete it',
          'Ignore it'
        ],
        correctAnswer: 1,
        explanation: 'Showcasing involves sharing your project and presenting your work to others.',
        difficulty: 'medium'
      },
      {
        id: 'q15-4',
        question: 'What is the next step after completing this course?',
        options: [
          'Stop learning',
          'Continue learning and explore advanced topics',
          'Forget everything',
          'There is no next step'
        ],
        correctAnswer: 1,
        explanation: 'After completing this course, you can continue learning and explore advanced topics.',
        difficulty: 'hard'
      }
    ]
  }
};

export function getQuizForLesson(lessonId: number): LessonQuiz | undefined {
  return quizzes[lessonId];
}

export function calculateScore(answers: number[], correctAnswers: number[]): {
  score: number;
  percentage: number;
  passed: boolean;
  passingScore: number;
} {
  let correct = 0;
  for (let i = 0; i < answers.length; i++) {
    if (answers[i] === correctAnswers[i]) {
      correct++;
    }
  }
  const percentage = Math.round((correct / answers.length) * 100);
  return {
    score: correct,
    percentage,
    passed: false, // Will be set based on passingScore
    passingScore: 0
  };
}
