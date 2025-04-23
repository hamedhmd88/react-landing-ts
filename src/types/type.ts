
// 1. Navbar Types
export interface MenuItem {
    name: string;
    desc: string;
    isNew?: boolean;
  }
  
  export interface Section {
    title: string;
    items: MenuItem[];
  }
  
  export interface CategoryWithSections {
    title: string;
    sections: Section[];
  }
  
  export interface CategoryWithItems {
    title: string;
    items: MenuItem[];
  }
  
  export type MenuItems = {
    platform: CategoryWithSections;
    solutions: CategoryWithItems;
    resources: CategoryWithItems;
  };
  
  export type MenuKey = keyof MenuItems;
  
  // 2. Company Logos
  export interface CompanyLogo {
    src: string;
    alt: string;
    width: number;
    height: number;
  }
  
  // 3. Features Section
  import { ReactNode } from 'react';
  export interface FeatureItem {
    icon: ReactNode;
    title: string;
    description: string;
    link: string;
  }
  
  // 4. Design Tabs Section
  export interface TabCTA {
    text: string;
    link: string;
  }
  
  export type DesignTab = {
    id: string;
    title: string;
    subtitle: string;
    video: string;
    poster: string;
    cta: TabCTA;
  };
  
  // 5. Customers Section
  export interface Customer {
    id: string;
    logo: string;
    video: string;
    poster: string;
    stat: string;
    statDesc: string;
    quote: string;
    author: string;
    link: string;
  }
  
  // 6. About Section
  export type AboutFeature = {
    id: string;
    title: string;
    description: string;
    link: string;
    linkText: string;
    video: string;
    poster: string;
  };
  
  // 7. Footer Section
  export interface FooterLink {
    name: string;
    href: string;
  }
  
  export interface FooterCategory {
    title: string;
    links: FooterLink[];
  }
  
  export type FooterLinks = {
    product: FooterCategory;
    company: FooterCategory;
    resources: FooterCategory;
  };
  
  export interface SocialLink {
    icon: ReactNode;
    href: string;
  }
  