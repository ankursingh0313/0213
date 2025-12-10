import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Experience, Project, BlogPost } from '../../types';
import { EXPERIENCES, PROJECTS, INITIAL_BLOG_POSTS } from '../constants';

interface DataState {
  experiences: Experience[];
  projects: Project[];
  blogPosts: BlogPost[];
}

const initialState: DataState = {
  experiences: EXPERIENCES,
  projects: PROJECTS,
  blogPosts: INITIAL_BLOG_POSTS,
};

export const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    addExperience: (state, action: PayloadAction<Experience>) => {
      state.experiences.unshift(action.payload);
    },
    updateExperience: (state, action: PayloadAction<Experience>) => {
      const index = state.experiences.findIndex(e => e.id === action.payload.id);
      if (index !== -1) {
        state.experiences[index] = action.payload;
      }
    },
    deleteExperience: (state, action: PayloadAction<string>) => {
      state.experiences = state.experiences.filter(e => e.id !== action.payload);
    },
    addProject: (state, action: PayloadAction<Project>) => {
      state.projects.unshift(action.payload);
    },
    updateProject: (state, action: PayloadAction<Project>) => {
      const index = state.projects.findIndex(p => p.id === action.payload.id);
      if (index !== -1) {
        state.projects[index] = action.payload;
      }
    },
    deleteProject: (state, action: PayloadAction<string>) => {
      state.projects = state.projects.filter(p => p.id !== action.payload);
    },
    addBlogPost: (state, action: PayloadAction<BlogPost>) => {
      state.blogPosts.unshift(action.payload);
    },
    updateBlogPost: (state, action: PayloadAction<BlogPost>) => {
      const index = state.blogPosts.findIndex(p => p.id === action.payload.id);
      if (index !== -1) {
        state.blogPosts[index] = action.payload;
      }
    },
    deleteBlogPost: (state, action: PayloadAction<string>) => {
      state.blogPosts = state.blogPosts.filter(p => p.id !== action.payload);
    },
  },
});

export const { 
  addExperience, updateExperience, deleteExperience,
  addProject, updateProject, deleteProject,
  addBlogPost, updateBlogPost, deleteBlogPost
} = dataSlice.actions;

export default dataSlice.reducer;
