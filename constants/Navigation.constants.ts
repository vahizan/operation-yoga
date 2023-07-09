import { NavMenuType } from "../ui/Navigation/types";

export const NAVIGATION_MENU_VALUES: NavMenuType[] = [
  {
    root: { title: "Home", link: "/" },
    children: [
      { root: { title: "Location", link: "/location" } },
      { root: { title: "Quick Booking", link: "/quick-booking" } },
      { root: { title: "Drop-in Lessons", link: "/lessons" } },
      { root: { title: "Contact Us", link: "/contact-us" } },
    ],
  },
  {
    root: { title: "About Us", link: "/about" },
    children: [
      { root: { title: "Our Mission", link: "/mission" } },
      { root: { title: "Our Teachers", link: "/teachers" } },
    ],
  },
  {
    root: { title: "Veda Yogshala", link: "/veda-yogshala" },
    children: [
      { root: { title: "Yoga Classes", link: "/veda-yogshala/yoga-classes" } },
      { root: { title: "Yoga Retreat", link: "/veda-yogshala/yoga-retreat" } },
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
      {
        root: {
          title: "Mantra Chanting",
          link: "/veda-yogshala/mantra-chanting",
        },
      },
    ],
  },
  {
    root: { title: "Veda Spa", link: "/veda-spa" },
    children: [
      { root: { title: "Spa Treatments", link: "/veda-spa/spa-treatments" } },
      // {root: {title:"Thai Yoga Massage", link: "/veda-spa/thai-yoga-massage"}},
      // {root: {title:"Shirodhara", link: "/veda-spa/shirodhara"}},
      // {root: {title:"Steam Bath", link: "/veda-spa/steam-bath"}},
      // {root: {title:"Massage Course", link: "/veda-spa/massage-course"}},
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
