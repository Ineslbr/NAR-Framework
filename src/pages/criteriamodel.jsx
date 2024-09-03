import * as React from 'react';
import { useState, useEffect } from 'react';
import ReactFlow, {
  MiniMap,
  Controls,
  Background
} from 'reactflow';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useLocation } from 'react-router-dom';
 
import 'reactflow/dist/style.css';


const criteria1Nodes = [
  { id: 'asd', position: { x: 0, y: -100 }, data: { label: 'ASD' , description: 'Autism Spectrum Disorder is a lifelong neurological disorder and is characterized by deficits in communication and social interactions, as well as restrictive and stereotyped behaviors. There are three classes of ASD: high, medium, and low functioning, with low functioning ASD being the most severe with serious communication problems and low cognitive function.', attributes: "Class: String;"} },
  { id: 'adhd', position: { x: 200, y: -50 }, data: { label: 'ADHD', description: 'ADHD is a neurodevelopmental disorder usually detected in childhood and persists into adulthood. Common symptoms include lack of focus, restlessness, forgetfulness, impulsivity, time management issues, disorganization, and emotional dysregulation.', attributes: "" } },
  { id: 'dyslexia', position: { x: 250, y: 100 }, data: { label: 'Dyslexia', description: 'Dyslexia is a specific learning disability which is neurological in origin. It is characterized by difficulties with accurate and/or fluent word recognition and by poor spelling and decoding abilities. These difficulties often result from a deficit in the phonological component of language, leading to secondary consequences such as problems in reading comprehension. Research broadly agrees on the distinction of three types of dyslexia: phonological, surface, and deep dyslexia.', attributes: "Type: String;" } },
  { id: 'learning', position: { x: -200, y: 50 }, data: { label: 'Learning', description: 'Learning is the process through which individuals acquire, enhance, or modify knowledge, skills, behaviors, or attitudes through experience, study, or instruction. This process can occur consciously or unconsciously and is a fundamental aspect of human development and adaptation.', attributes: "" } },
  { id: 'taskcompletion', position: { x: 0, y: 200 }, data: { label: 'Task Completion', description: 'Task completion is the process of finishing a specific activity or assignment according to set criteria or goals. It involves carrying out all required steps and meeting necessary standards to achieve the desired outcome.', attributes: "Instructions: String;/Decomposition: String;/Prioritization: String;" } },
  { id: 'userguide', position: { x: -250, y: 200 }, data: { label: 'User Guide', description: 'A user guide is a document that provides instructions and information on how to use a product, system, or service. It typically includes step-by-step directions, troubleshooting tips, and technical details to help users understand and effectively operate the item.', attributes: "Instructions: String;" } },
];
const criteria1Edges = [
  { id: 'e1-9', source: 'dyslexia', target: 'learning' , data: {label: 'Dyslexia Has Issue With Learning', description: 'Dyslexia is a specific learning disability.', attributes: ""}},
  { id: 'e1-10', source: 'dyslexia', target: 'taskcompletion' , data: {label: 'Dyslexia Has Issue With Task Completion', description: '', attributes: ""}},
  { id: 'e1-11', source: 'asd', target: 'learning' , data: {label: 'ASD Has Issue With Learning', description: '', attributes: ""}},
  { id: 'e1-12', source: 'asd', target: 'taskcompletion' , data: {label: 'ASD Has Issue With Task Completion', description: '', attributes: ""}},
  { id: 'e1-13', source: 'adhd', target: 'learning' , data: {label: 'ADHD Has Issue With Learning', description: '', attributes: ""}},
  { id: 'e1-14', source: 'adhd', target: 'taskcompletion' , data: {label: 'ADHD Has Issue With Task Completion', description: '', attributes: ""}},
  { id: 'e1-15', source: 'taskcompletion', target: 'userguide' , data: {label: 'Task Completion Is Solved With User Guide', description: '', attributes: ""}},
  { id: 'e1-16', source: 'learning', target: 'userguide' , data: {label: 'Learning Is Solved With User Guide', description: '', attributes: ""}},
 ];

const criteria2Nodes = [
  { id: 'dyslexia', position: { x: 0, y: 0 }, data: { label: 'Dyslexia', description: 'Dyslexia is a specific learning disability which is neurological in origin. It is characterized by difficulties with accurate and/or fluent word recognition and by poor spelling and decoding abilities. These difficulties often result from a deficit in the phonological component of language, leading to secondary consequences such as problems in reading comprehension. Research broadly agrees on the distinction of three types of dyslexia: phonological, surface, and deep dyslexia.', attributes: "Type: String;" } },
  { id: 'navigation', position: { x: 300, y: 0 }, data: { label: 'Navigation', description: 'Navigation is the system and process of guiding users through a website, enabling them to find and access different pages and content easily. It typically includes menus, links, and other interface elements that help users locate information and understand the structure of the site.', attributes: "" } },
  { id: 'orgcontent', position: { x: 0, y: 150 }, data: { label: 'Organization of Content', description: 'The organization of content on a website refers to the structured arrangement of information and multimedia elements across various pages, ensuring that content is logically categorized and easy to navigate. This involves creating a clear hierarchy and intuitive layout to enhance user experience and facilitate efficient information retrieval.', attributes: "" } },
  { id: 'intelem', position: { x: 300, y: 150 }, data: { label: 'Interaction Elements', description: 'Interaction elements on a website are components that enable user engagement and actions. These include buttons, links, forms, menus, and other interactive features that allow users to navigate, input information, and perform tasks on the site.', attributes: "" } },
];
const criteria2Edges = [
  { id: 'e2-2', source: 'dyslexia', target: 'navigation', data: {label: 'Dyslexia Has Issue With Navigation', description: '', attributes: "" } },
  { id: 'e2-3', source: 'navigation', target: 'orgcontent' , data: {label: 'Navigation Is Solved With Organization of Content', description: '', attributes: "" }},
  { id: 'e2-4', source: 'navigation', target: 'intelem' , data: {label: 'Navigation Is Solved With Interaction Elements', description: '', attributes: ""}},
  ];

const criteria3Nodes = [
  { id: 'asd', position: { x: -200, y: -100 }, data: { label: 'ASD' , description: 'Autism Spectrum Disorder is a lifelong neurological disorder and is characterized by deficits in communication and social interactions, as well as restrictive and stereotyped behaviors. There are three classes of ASD: high, medium, and low functioning, with low functioning ASD being the most severe with serious communication problems and low cognitive function.', attributes: "Class: String;"} },
  { id: 'adhd', position: { x: 0, y: 100 }, data: { label: 'ADHD', description: 'ADHD is a neurodevelopmental disorder usually detected in childhood and persists into adulthood. Common symptoms include lack of focus, restlessness, forgetfulness, impulsivity, time management issues, disorganization, and emotional dysregulation.', attributes: "" } },
  { id: 'dyslexia', position: { x: 200, y: -100 }, data: { label: 'Dyslexia', description: 'Dyslexia is a specific learning disability which is neurological in origin. It is characterized by difficulties with accurate and/or fluent word recognition and by poor spelling and decoding abilities. These difficulties often result from a deficit in the phonological component of language, leading to secondary consequences such as problems in reading comprehension. Research broadly agrees on the distinction of three types of dyslexia: phonological, surface, and deep dyslexia.', attributes: "Type: String;" } },
  { id: 'scaninformation', position: { x: 200, y: 50 }, data: { label: 'Scanning for Information', description: 'Scanning for information on a website is the process by which users quickly browse and visually search through content to locate specific information or keywords. This involves looking for headings, bullet points, highlighted text, and other visual cues that stand out and guide the user to relevant content efficiently.', attributes: "" } },
  { id: 'concentration', position: { x: -200, y: 50 }, data: { label: 'Concentration', description: 'Concentration is the mental ability to focus attention and sustain it on a specific task or subject without being distracted. It involves directing cognitive resources towards a particular activity to achieve better understanding, performance, or productivity. ', attributes: "" } },
  { id: 'visualaids', position: { x: 200, y: 200 }, data: { label: 'Visual Aids', description: 'Visual aids are tools or materials used to enhance presentations, lectures, or communication by providing visual representation of information. These can include slides, charts, graphs, diagrams, photographs, videos, or any other visual elements that help convey complex concepts, illustrate ideas, and improve audience understanding and engagement.', attributes: "" } },
  { id: 'adapinterface', position: { x: -200, y: 200 }, data: { label: 'Adaptive User Interface', description: 'An adaptive user interface is a design approach that tailors the presentation and functionality of a system or application based on user preferences, behavior, context, or device characteristics. It dynamically adjusts elements such as layout, content, navigation, and features to optimize the user experience and accommodate varying needs and situations.', attributes: "User Preferences: String;/Usage History: String;/User Needs: String;" } },
  { id: 'interelements', position: { x: -300, y: 320 }, data: { label: 'Interaction Elements', description: 'Interaction elements on a website are components that enable user engagement and actions. These include buttons, links, forms, menus, and other interactive features that allow users to navigate, input information, and perform tasks on the site.', attributes: "" } },
  { id: 'limitinformation', position: { x: -450, y: 250 }, data: { label: 'Limited Information', description: 'Limited information on a website refers to the deliberate strategy of presenting only essential or concise content to users, focusing on providing key details without overwhelming them with excessive information. This approach aims to streamline the user experience, making it easier for visitors to quickly find the information they need without being bogged down by unnecessary or irrelevant content.', attributes: "Text String;" } },
  { id: 'interstyling', position: { x: -100, y: 320 }, data: { label: 'Interface Styling', description: 'Interface styling involves the design and presentation of visual elements within a user interface to create a cohesive and aesthetically pleasing look. This includes choices regarding colors, fonts, spacing, shapes, and other graphical attributes that contribute to the overall appearance and usability of the interface.', attributes: "Font Size: Integer;/Color Scheme: String;/Font: String;/Background: String;" } },
  { id: 'mediafeatures', position: { x: -450, y: 150 }, data: { label: 'Media Features', description: 'Media features refer to the characteristics and capabilities of various types of media, such as images, videos, and audio, that are used in digital content. These features include attributes like resolution, size, format, responsiveness, and accessibility options, which can impact how media content is displayed, loaded, and interacted with across different devices and platforms.', attributes: "" } },
  ];
const criteria3Edges = [
  { id: 'e3-5', source: 'dyslexia', target: 'scaninformation' , data: {label: 'Dyslexia Has Issue With Scanning for Information', description: '', attributes: ""}},
  { id: 'e3-6', source: 'dyslexia', target: 'concentration' , data: {label: 'Dyslexia Has Issue With Concentration', description: '', attributes: ""}},
  { id: 'e3-7', source: 'adhd', target: 'concentration' , data: {label: 'ADHD Has Issue With Concentration', description: '', attributes: ""}},
  { id: 'e3-8', source: 'asd', target: 'concentration' , data: {label: 'ASD Has Issue With Concentration', description: '', attributes: ""}},
  { id: 'e3-9', source: 'scaninformation', target: 'visualaids' , data: {label: 'Scanning for Information Is Solved With Visual Aids', description: '', attributes: ""}},
  { id: 'e3-10', source: 'concentration', target: 'adapinterface' , data: {label: 'Concentration Is Solved With Adaptive User Interface', description: '', attributes: ""}},
  { id: 'e3-11', source: 'adapinterface', target: 'interelements' , data: {label: 'Adaptive User Interface Is Extended By Interaction Elements', description: '', attributes: ""}},
  { id: 'e3-12', source: 'adapinterface', target: 'limitinformation' , data: {label: 'Adaptive User Interface Is Extended By Limited Information', description: '', attributes: ""}},
  { id: 'e3-13', source: 'adapinterface', target: 'interstyling' , data: {label: 'Adaptive User Interface Is Extended By Interface Styling', description: '', attributes: ""}},
  { id: 'e3-14', source: 'adapinterface', target: 'mediafeatures' , data: {label: 'Adaptive User Interface Is Extended By Media Features', description: '', attributes: ""}},
  ];

const criteria4Nodes = [
  { id: 'asd', position: { x: -200, y: -100 }, data: { label: 'ASD' , description: 'Autism Spectrum Disorder is a lifelong neurological disorder and is characterized by deficits in communication and social interactions, as well as restrictive and stereotyped behaviors. There are three classes of ASD: high, medium, and low functioning, with low functioning ASD being the most severe with serious communication problems and low cognitive function.', attributes: "Class: String;"} },
  { id: 'adhd', position: { x: 0, y: 100 }, data: { label: 'ADHD', description: 'ADHD is a neurodevelopmental disorder usually detected in childhood and persists into adulthood. Common symptoms include lack of focus, restlessness, forgetfulness, impulsivity, time management issues, disorganization, and emotional dysregulation.', attributes: "" } },
  { id: 'dyslexia', position: { x: 200, y: -100 }, data: { label: 'Dyslexia', description: 'Dyslexia is a specific learning disability which is neurological in origin. It is characterized by difficulties with accurate and/or fluent word recognition and by poor spelling and decoding abilities. These difficulties often result from a deficit in the phonological component of language, leading to secondary consequences such as problems in reading comprehension. Research broadly agrees on the distinction of three types of dyslexia: phonological, surface, and deep dyslexia.', attributes: "Type: String;" } },
  { id: 'writing', position: { x: 500, y: -300 }, data: { label: 'Writing', description: '', attributes: "" } },
  { id: 'reading', position: { x: 500, y: -100 }, data: { label: 'Reading', description: 'Reading is the process of interpreting written or printed text to extract meaning and understanding. It involves decoding written symbols, comprehending their significance, and constructing meaning from the information conveyed by the text. Reading is a fundamental skill that facilitates learning, communication, and access to knowledge across various domains.', attributes: "" } },
  { id: 'taskcompletion', position: { x: 300, y: 100 }, data: { label: 'Task Completion', description: 'Task completion is the process of finishing a specific activity or assignment according to set criteria or goals. It involves carrying out all required steps and meeting necessary standards to achieve the desired outcome.', attributes: "Instructions: String;/Decomposition: String;/Prioritization: String;" } },
  { id: 'concentration', position: { x: -200, y: 200 }, data: { label: 'Concentration', description: 'Concentration is the mental ability to focus attention and sustain it on a specific task or subject without being distracted. It involves directing cognitive resources towards a particular activity to achieve better understanding, performance, or productivity.', attributes: "" } },
  { id: 'sensoryissues', position: { x: -450, y: 0 }, data: { label: 'Sensory Issues', description: 'Sensory issues refer to difficulties or sensitivities experienced by individuals in processing and responding to sensory information from their environment. This can involve heightened sensitivity (hypersensitivity) or decreased sensitivity (hyposensitivity) to sensory stimuli such as touch, sound, light, taste, or smell. Sensory issues can impact a persons daily functioning, behavior, and overall well-being, particularly in individuals with sensory processing disorders or certain neurological conditions such as autism spectrum disorder.', attributes: "Stimuli: String;" } },
  { id: 'spellchecker', position: { x: 750, y: -100 }, data: { label: 'Spellchecker', description: '', attributes: "" } },
  { id: 'autocomplete', position: { x: 750, y: -300 }, data: { label: 'Autocomplete', description: '', attributes: "" } },
  { id: 'readingaid', position: { x: 500, y: 100 }, data: { label: 'Reading Aid', description: '', attributes: "Line Tick: Boolean;/Reading Ruler: Boolean;" } },
  { id: 'reminders', position: { x: 300, y: 300 }, data: { label: 'Reminders', description: '', attributes: "" } },
  { id: 'schedule', position: { x: 150, y: 250 }, data: { label: 'Schedule', description: '', attributes: "" } },
  { id: 'rewards', position: { x: 500, y: 300 }, data: { label: 'Rewards', description: '', attributes: "" } },
  { id: 'progtracker', position: { x: 650, y: 250 }, data: { label: 'Task Progress Tracker', description: '', attributes: "" } },
  { id: 'virtualreality', position: { x: -450, y: 300 }, data: { label: 'Virtual Reality', description: '', attributes: "" } },
  { id: 'adapinterface', position: { x: 0, y: 300 }, data: { label: 'Adaptive User Interface', description: 'An adaptive user interface is a design approach that tailors the presentation and functionality of a system or application based on user preferences, behavior, context, or device characteristics. It dynamically adjusts elements such as layout, content, navigation, and features to optimize the user experience and accommodate varying needs and situations.', attributes: "User Preferences: String;/Usage History: String;/User Needs: String;" } },
  { id: 'soundcontrol', position: { x: -450, y: 150 }, data: { label: 'Sound Control', description: '', attributes: "" } },
  { id: 'interelements', position: { x: -70, y: 450 }, data: { label: 'Interaction Elements', description: 'Interaction elements on a website are components that enable user engagement and actions. These include buttons, links, forms, menus, and other interactive features that allow users to navigate, input information, and perform tasks on the site.', attributes: "" } },
  { id: 'limitinformation', position: { x: -180, y: 400 }, data: { label: 'Limited Information', description: 'Limited information on a website refers to the deliberate strategy of presenting only essential or concise content to users, focusing on providing key details without overwhelming them with excessive information. This approach aims to streamline the user experience, making it easier for visitors to quickly find the information they need without being bogged down by unnecessary or irrelevant content.', attributes: "Text String;" } },
  { id: 'interstyling', position: { x: 100, y: 450 }, data: { label: 'Interface Styling', description: 'Interface styling involves the design and presentation of visual elements within a user interface to create a cohesive and aesthetically pleasing look. This includes choices regarding colors, fonts, spacing, shapes, and other graphical attributes that contribute to the overall appearance and usability of the interface.', attributes: "Font Size: Integer;/Color Scheme: String;/Font: String;/Background: String;" } },
  { id: 'mediafeatures', position: { x: 200, y: 400 }, data: { label: 'Media Features', description: 'Media features refer to the characteristics and capabilities of various types of media, such as images, videos, and audio, that are used in digital content. These features include attributes like resolution, size, format, responsiveness, and accessibility options, which can impact how media content is displayed, loaded, and interacted with across different devices and platforms.', attributes: "" } },
];  
const criteria4Edges = [
  { id: 'e4-10', source: 'dyslexia', target: 'writing' , data: {label: 'Dyslexia Has Issue With Writing', description: '', attributes: ""}},
  { id: 'e4-11', source: 'dyslexia', target: 'reading' , data: {label: 'Dyslexia Has Issue With Reading', description: '', attributes: ""}},
  { id: 'e4-12', source: 'dyslexia', target: 'taskcompletion' , data: {label: 'Dyslexia Has Issue With Task Completion', description: '', attributes: ""}},
  { id: 'e4-13', source: 'adhd', target: 'taskcompletion' , data: {label: 'Dyslexia Has Issue With Task Completion', description: '', attributes: ""}},
  { id: 'e4-14', source: 'asd', target: 'taskcompletion' , data: {label: 'Dyslexia Has Issue With Task Completion', description: '', attributes: ""}},
  { id: 'e4-15', source: 'dyslexia', target: 'concentration' , data: {label: 'Dyslexia Has Issue With Concentration', description: '', attributes: ""}},
  { id: 'e4-16', source: 'adhd', target: 'concentration' , data: {label: 'Dyslexia Has Issue With Concentration', description: '', attributes: ""}},
  { id: 'e4-17', source: 'asd', target: 'concentration' , data: {label: 'Dyslexia Has Issue With Concentration', description: '', attributes: ""}},
  { id: 'e4-18', source: 'asd', target: 'sensoryissues' , data: {label: 'Dyslexia Has Issue With Sensory Issues', description: '', attributes: ""}},
  { id: 'e4-19', source: 'writing', target: 'spellchecker' , data: {label: 'Writing Is Solved By Spellchecker', description: '', attributes: ""}},
  { id: 'e4-20', source: 'writing', target: 'autocomplete' , data: {label: 'Writing Is Solved By Autocomplete', description: '', attributes: ""}},
  { id: 'e4-21', source: 'reading', target: 'readingaid' , data: {label: 'Reading Is Solved By Reading Aid', description: '', attributes: ""}},
  { id: 'e4-22', source: 'taskcompletion', target: 'reminders' , data: {label: 'Task Completion Is Solved By Reminders', description: '', attributes: ""}},
  { id: 'e4-23', source: 'taskcompletion', target: 'schedule' , data: {label: 'Task Completion Is Solved By Schedule', description: '', attributes: ""}},
  { id: 'e4-24', source: 'taskcompletion', target: 'rewards' , data: {label: 'Task Completion Is Solved By Rewards', description: '', attributes: ""}},
  { id: 'e4-25', source: 'taskcompletion', target: 'progtracker' , data: {label: 'Task Completion Is Solved By Progress Tracker', description: '', attributes: ""}},
  { id: 'e4-26', source: 'concentration', target: 'virtualreality' , data: {label: 'Concentration Is Solved By Virtual Reality', description: '', attributes: ""}},
  { id: 'e4-27', source: 'concentration', target: 'adapinterface' , data: {label: 'Concentration Is Solved By Adaptive User Interface', description: '', attributes: ""}},
  { id: 'e4-28', source: 'sensoryissues', target: 'soundcontrol' , data: {label: 'Sensory Issues Is Solved By Sound Control', description: '', attributes: ""}},  
  { id: 'e4-29', source: 'adapinterface', target: 'interelements' , data: {label: 'Adaptive User Interface Is Extended By Interaction Elements', description: '', attributes: ""}},
  { id: 'e4-30', source: 'adapinterface', target: 'limitinformation' , data: {label: 'Adaptive User Interface Is Extended By Limited Information', description: '', attributes: ""}},
  { id: 'e4-31', source: 'adapinterface', target: 'interstyling' , data: {label: 'Adaptive User Interface Is Extended By Interface Styling', description: '', attributes: ""}},
  { id: 'e4-32', source: 'adapinterface', target: 'mediafeatures' , data: {label: 'Adaptive User Interface Is Extended By Media Features', description: '', attributes: ""}},

];

const criteria5Nodes = [
  { id: 'asd', position: { x: -200, y: -100 }, data: { label: 'ASD' , description: 'Autism Spectrum Disorder is a lifelong neurological disorder and is characterized by deficits in communication and social interactions, as well as restrictive and stereotyped behaviors. There are three classes of ASD: high, medium, and low functioning, with low functioning ASD being the most severe with serious communication problems and low cognitive function.', attributes: "Class: String;"} },
  { id: 'adhd', position: { x: 0, y: 100 }, data: { label: 'ADHD', description: 'ADHD is a neurodevelopmental disorder usually detected in childhood and persists into adulthood. Common symptoms include lack of focus, restlessness, forgetfulness, impulsivity, time management issues, disorganization, and emotional dysregulation.', attributes: "" } },
  { id: 'dyslexia', position: { x: 200, y: -100 }, data: { label: 'Dyslexia', description: 'Dyslexia is a specific learning disability which is neurological in origin. It is characterized by difficulties with accurate and/or fluent word recognition and by poor spelling and decoding abilities. These difficulties often result from a deficit in the phonological component of language, leading to secondary consequences such as problems in reading comprehension. Research broadly agrees on the distinction of three types of dyslexia: phonological, surface, and deep dyslexia.', attributes: "Type: String;" } }, 
  { id: 'reading', position: { x: 500, y: -100 }, data: { label: 'Reading', description: 'Reading is the process of interpreting written or printed text to extract meaning and understanding. It involves decoding written symbols, comprehending their significance, and constructing meaning from the information conveyed by the text. Reading is a fundamental skill that facilitates learning, communication, and access to knowledge across various domains.', attributes: "" } },
  { id: 'taskcompletion', position: { x: 300, y: 100 }, data: { label: 'Task Completion', description: 'Task completion is the process of finishing a specific activity or assignment according to set criteria or goals. It involves carrying out all required steps and meeting necessary standards to achieve the desired outcome.', attributes: "Instructions: String;/Decomposition: String;/Prioritization: String;" } },
  { id: 'concentration', position: { x: -450, y: 200 }, data: { label: 'Concentration', description: 'Concentration is the mental ability to focus attention and sustain it on a specific task or subject without being distracted. It involves directing cognitive resources towards a particular activity to achieve better understanding, performance, or productivity.', attributes: "" } },
  { id: 'sensoryissues', position: { x: -450, y: 0 }, data: { label: 'Sensory Issues', description: 'Sensory issues refer to difficulties or sensitivities experienced by individuals in processing and responding to sensory information from their environment. This can involve heightened sensitivity (hypersensitivity) or decreased sensitivity (hyposensitivity) to sensory stimuli such as touch, sound, light, taste, or smell. Sensory issues can impact a persons daily functioning, behavior, and overall well-being, particularly in individuals with sensory processing disorders or certain neurological conditions such as autism spectrum disorder.', attributes: "Stimuli: String;" } },
  { id: 'interstyling', position: { x: 500, y: 150 }, data: { label: 'Interface Styling', description: 'Interface styling involves the design and presentation of visual elements within a user interface to create a cohesive and aesthetically pleasing look. This includes choices regarding colors, fonts, spacing, shapes, and other graphical attributes that contribute to the overall appearance and usability of the interface.', attributes: "Font Size: Integer;/Color Scheme: String;/Font: String;/Background: String;" } },
  { id: 'adapinterface', position: { x: 0, y: 300 }, data: { label: 'Adaptive User Interface', description: 'An adaptive user interface is a design approach that tailors the presentation and functionality of a system or application based on user preferences, behavior, context, or device characteristics. It dynamically adjusts elements such as layout, content, navigation, and features to optimize the user experience and accommodate varying needs and situations.', attributes: "User Preferences: String;/Usage History: String;/User Needs: String;" } },
  { id: 'interelements', position: { x: 150, y: 400 }, data: { label: 'Interaction Elements', description: 'Interaction elements on a website are components that enable user engagement and actions. These include buttons, links, forms, menus, and other interactive features that allow users to navigate, input information, and perform tasks on the site.', attributes: "" } },
  { id: 'limitinformation', position: { x: 0, y: 450 }, data: { label: 'Limited Information', description: 'Limited information on a website refers to the deliberate strategy of presenting only essential or concise content to users, focusing on providing key details without overwhelming them with excessive information. This approach aims to streamline the user experience, making it easier for visitors to quickly find the information they need without being bogged down by unnecessary or irrelevant content.', attributes: "Text String;" } },
  { id: 'mediafeatures', position: { x: -150, y: 400 }, data: { label: 'Media Features', description: 'Media features refer to the characteristics and capabilities of various types of media, such as images, videos, and audio, that are used in digital content. These features include attributes like resolution, size, format, responsiveness, and accessibility options, which can impact how media content is displayed, loaded, and interacted with across different devices and platforms.', attributes: "" } },
  ];  
const criteria5Edges = [
  { id: 'e5-30', source: 'dyslexia', target: 'reading' , data: {label: 'Dyslexia Has Issue With Reading', description: '', attributes: ""}},
  { id: 'e5-31', source: 'dyslexia', target: 'taskcompletion' , data: {label: 'Dyslexia Has Issue With Task Completion', description: '', attributes: ""}},
  { id: 'e5-32', source: 'adhd', target: 'taskcompletion' , data: {label: 'ADHD Has Issue With Task Completion', description: '', attributes: ""}},
  { id: 'e5-33', source: 'asd', target: 'taskcompletion' , data: {label: 'ASD Has Issue With Task Completion', description: '', attributes: ""}},
  { id: 'e5-34', source: 'dyslexia', target: 'concentration' , data: {label: 'Dyslexia Has Issue With Concentration', description: '', attributes: ""}},
  { id: 'e5-35', source: 'adhd', target: 'concentration' , data: {label: 'ADHD Has Issue With Concentration', description: '', attributes: ""}},
  { id: 'e5-36', source: 'asd', target: 'concentration' , data: {label: 'ASD Has Issue With Concentration', description: '', attributes: ""}},
  { id: 'e5-37', source: 'asd', target: 'sensoryissues' , data: {label: 'ASD Has Issue With Sensory Issues', description: '', attributes: ""}},
  { id: 'e5-38', source: 'reading', target: 'interstyling' , data: {label: 'Reading Is Solved With Interface Styling', description: '', attributes: ""}},
  { id: 'e5-39', source: 'taskcompletion', target: 'adapinterface' , data: {label: 'Task Completion Is Solved With Adaptive User Interface', description: '', attributes: ""}},
  { id: 'e5-40', source: 'concentration', target: 'adapinterface' , data: {label: 'Concentration Is Solved With Adaptive User Interface', description: '', attributes: ""}},
  { id: 'e5-41', source: 'sensoryissues', target: 'adapinterface' , data: {label: 'Sensory Issues Is Solved With Adaptive User Interface', description: '', attributes: ""}},
  { id: 'e5-42', source: 'adapinterface', target: 'interelements' , data: {label: 'Adaptive User Interface Is Extended By Interaction Elements', description: '', attributes: ""}},
  { id: 'e5-43', source: 'adapinterface', target: 'limitinformation' , data: {label: 'Adaptive User Interface Is Extended By Limited Information', description: '', attributes: ""}},
  { id: 'e5-44', source: 'adapinterface', target: 'interstyling' , data: {label: 'Adaptive User Interface Is Extended By Interface Styling', description: '', attributes: ""}},
  { id: 'e5-45', source: 'adapinterface', target: 'mediafeatures' , data: {label: 'Adaptive User Interface Is Extended By Media Features', description: '', attributes: ""}},

];

const criteriaData = [
  { id: "1", data: {label: "Learnability  ", guidelines:"1. There should be an increase of font size and avoid low contrast color schemes, also avoid the use of italics or low legible font styling/2. The User Interfaces should adapt the way the user interacts to the software system to his characteristics, sensory particularities and context of use"}},
  { id: "2", data: {label: "Navigation", guidelines:"1. There should be an investigation on how the target users find most logical the organization of content on websites./2. Interaction elements should be visible and clear."}},
  { id: "3", data: {label: "Simplicity", guidelines:"1. The text should contain visual aids as support that makes the content stand out from the rest of the web page./2. There should be avoided the presence of irrelevant information or distracting media."}},
  { id: "4", data: {label: "Customisability", guidelines:"1. There should be an option to activate a spellchecker function./2. There should be an option to activate an autocomplete function./3. There should be an option to activate a reading aid function./4. There should be an option to activate reminders for the planned tasks./5. There should be an option to activate scheduling for the planned tasks./6. There should be an option to activate rewards for the planned tasks./7. There should be an option to activate a progress tracker for the planned tasks./8. There should be an option to activate a virtual reality mode./9. The should be an option to personalise the media displayed and customize it’s features./10. The should be an option to personalise the sound and customize it’s features."}},
  { id: "5", data: {label: "Aesthetic and Minimalist Design", guidelines:"1. There should be an increase of font size and avoid low contrast color schemes, also avoid the use of italics or low legible font styling./2. The User Interfaces should adapt the way the user interacts to the software system to his characteristics, sensory particularities and context of use."}},
];
 
export default function Criteria() {

  const location = useLocation();

  const [selectedNodes, setSelectedNodes] = React.useState(criteria1Nodes);
  const [selectedEdges, setSelectedEdges] = React.useState(criteria1Edges);
  const [selectedCriteria, setSelectedCriteria] = React.useState("C1 - Learnability");
  const [selectedAttributes, setSelectedAttributes] = React.useState("N/A");

  

  useEffect(() => {
    if(location.state.type == null){
      
    }
    else if(location.state.type == '1') {
      setSelectedNodes(criteria2Nodes)
      setSelectedEdges(criteria2Edges)
    }
    else if(location.state.type == '2') {
      setSelectedNodes(criteria3Nodes)
      setSelectedEdges(criteria3Edges)
    }
    else if(location.state.type == '3') {
      setSelectedNodes(criteria4Nodes)
      setSelectedEdges(criteria4Edges)
    }
    else if(location.state.type == '4') {
      setSelectedNodes(criteria5Nodes)
      setSelectedEdges(criteria5Edges)
    }
    else {
      setSelectedNodes(criteria1Nodes)
      setSelectedEdges(criteria1Edges)
    }
    
    if(document.getElementById("guidelines").innerHTML == "") {
      var x = Number(location.state.type)
      setSelectedCriteria(criteriaData[x].data.label)
      const aux = criteriaData[x].data.guidelines.split("/");
      for(var i = 0; i < aux.length; i++) {
        document.getElementById("guidelines").innerHTML += "<p>" + aux[i] + "</p>";
      }
    }
    },[]);  

  const onNodeClick = (event, node) => {
    setSelectedLabel(node.data.label);
    setSelectedDescription(node.data.description);
    if(node.data.attributes != "") {
      setSelectedAttributes(node.data.attributes)
    }
    else {
      setSelectedAttributes("N/A")
    }
    
    setOpen(true);
    console.log('click node', node.data.label)
  };

  const onEdgeClick = (event, edge) => {
    setSelectedLabel(edge.data.label);
    setSelectedDescription(edge.data.description);
    setSelectedAttributes("N/A")
    setOpen(true);
    console.log('click edge', edge.data.label)
  };

  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);

  const [selectedLabel, setSelectedLabel] = React.useState(criteria1Nodes[1].data.label);
  const [selectedDescription, setSelectedDescription] = React.useState(criteria1Nodes[1].data.description);   


  return (
    <>
    <div style={{ width: '100vw', height: '100vh' ,backgroundColor: '#FFFFFF', overflow: 'scroll'}} >
      <b>
        <a href="/selector2">Go Back</a>
      </b>
      <div style={{textAlign:'center'}}>
          <b>
            Guidelines for {selectedCriteria}
          </b>
          <div id='guidelines'>
          </div>
      </div>
      <ReactFlow 
        nodes={selectedNodes} 
        edges={selectedEdges} 
        onNodeClick={onNodeClick} 
        onEdgeClick={onEdgeClick}
        fitView
        >
        <Controls />
        <MiniMap />
        <Background variant="dots" gap={12} size={1} />
      </ReactFlow>
      
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          border: '2px solid #000',
          boxShadow: 24,
          p: 4,
          color: 'black'
        }}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {selectedLabel}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <b>Definition: </b>{selectedDescription}
          </Typography>
          <Typography id="modal-modal-attributes" sx={{ mt: 2 }}>
            <b>Attributes: </b>
            {selectedAttributes}
          </Typography>
        </Box>
        
      </Modal>
    </div>
    </>
  );
}