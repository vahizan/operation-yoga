import { NavMenuType } from "../types/NavigationTypes";

export const NAVIGATION_MENU_VALUES: NavMenuType[] = [
  { root: { title: "Home", link: "/" } },
  { root: { title: "Location", link: "/location" } },
  { root: { title: "About Us", link: "/about" } },
  { root: { title: "Our Mission", link: "/our-mission" } },
  { root: { title: "Our Teachers", link: "/teachers" } },
  { root: { title: "Contact Us", link: "/contact-us" } },
  { root: { title: "Quick Booking", link: "/quick-booking" } },
  {
    root: { title: "Veda Yoga Centre", link: "/veda-yoga-centre" },
    children: [
      {
        root: { title: "Yoga Classes", link: "/veda-yoga-centre/yoga-classes" },
      },
      {
        root: { title: "Yoga Retreat", link: "/veda-yoga-centre/yoga-retreat" },
      },
      {
        root: {
          title: "Teachers' Training Courses",
          link: "/veda-yogshala/teacher-training-courses",
        },
      },
      {
        root: {
          title: "Language Courses",
          link: "/veda-yogshala/language-courses",
        },
      },
      {
        root: {
          title: "Indian Cooking Classes",
          link: "/veda-yogshala/indian-cooking-classes",
        },
      },
      {
        root: {
          title: "Pranayama & Meditation",
          link: "/veda-yogshala/pranayama-meditation",
        },
      },
    ],
  },
  {
    root: { title: "Veda Spa", link: "/veda-spa" },
    children: [
      { root: { title: "Spa Treatments", link: "/veda-spa/spa-treatments" } },
    ],
  },
  {
    root: { title: "Blog", link: "/blog" },
    children: [
      {
        root: { title: "What is Hatha Yoga", link: "/blog/what-is-hatha-yoga" },
      },
      {
        root: {
          title: "More about Ashtanga",
          link: "/blog/more-about-ashtanga",
        },
      },
      {
        root: {
          title: "Mountain Pose vs Downward Dog",
          link: "/blog/mountain-pose-vs-downward-dog",
        },
      },
    ],
  },
  {
    root: { title: "Gallery", link: "/gallery" },
    children: [
      { root: { title: "Photo", link: "/gallery/photo" } },
      { root: { title: "Video", link: "/gallery/video" } },
    ],
  },
];
