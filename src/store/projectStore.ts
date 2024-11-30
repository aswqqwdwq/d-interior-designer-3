import create from 'zustand';
import { persist } from 'zustand/middleware';
import localforage from 'localforage';

interface ProjectState {
  objects: any[];
  selectedObject: any | null;
  history: any[];
  historyIndex: number;
  viewMode: '2d' | '3d';
  gridEnabled: boolean;
  measurementsEnabled: boolean;
  
  // Actions
  addObject: (object: any) => void;
  removeObject: (id: string) => void;
  updateObject: (id: string, updates: any) => void;
  setSelectedObject: (object: any | null) => void;
  undo: () => void;
  redo: () => void;
  setViewMode: (mode: '2d' | '3d') => void;
  toggleGrid: () => void;
  toggleMeasurements: () => void;
  saveProject: (name: string) => Promise<void>;
  loadProject: (name: string) => Promise<void>;
}

const useProjectStore = create<ProjectState>()(
  persist(
    (set, get) => ({
      objects: [],
      selectedObject: null,
      history: [],
      historyIndex: -1,
      viewMode: '2d',
      gridEnabled: true,
      measurementsEnabled: true,

      addObject: (object) => {
        const newObject = { ...object, id: Date.now().toString() };
        set((state) => ({
          objects: [...state.objects, newObject],
          history: [...state.history.slice(0, state.historyIndex + 1), { type: 'add', object: newObject }],
          historyIndex: state.historyIndex + 1,
        }));
      },

      removeObject: (id) => {
        set((state) => ({
          objects: state.objects.filter((obj) => obj.id !== id),
          history: [...state.history.slice(0, state.historyIndex + 1), { type: 'remove', id }],
          historyIndex: state.historyIndex + 1,
        }));
      },

      updateObject: (id, updates) => {
        set((state) => ({
          objects: state.objects.map((obj) =>
            obj.id === id ? { ...obj, ...updates } : obj
          ),
          history: [...state.history.slice(0, state.historyIndex + 1), { type: 'update', id, updates }],
          historyIndex: state.historyIndex + 1,
        }));
      },

      setSelectedObject: (object) => {
        set({ selectedObject: object });
      },

      undo: () => {
        const { historyIndex, history } = get();
        if (historyIndex >= 0) {
          const action = history[historyIndex];
          set((state) => {
            let newObjects = [...state.objects];
            switch (action.type) {
              case 'add':
                newObjects = newObjects.filter((obj) => obj.id !== action.object.id);
                break;
              case 'remove':
                newObjects.push(action.object);
                break;
              case 'update':
                newObjects = newObjects.map((obj) =>
                  obj.id === action.id ? { ...obj, ...action.previousState } : obj
                );
                break;
            }
            return {
              objects: newObjects,
              historyIndex: historyIndex - 1,
            };
          });
        }
      },

      redo: () => {
        const { historyIndex, history } = get();
        if (historyIndex < history.length - 1) {
          const action = history[historyIndex + 1];
          set((state) => {
            let newObjects = [...state.objects];
            switch (action.type) {
              case 'add':
                newObjects.push(action.object);
                break;
              case 'remove':
                newObjects = newObjects.filter((obj) => obj.id !== action.id);
                break;
              case 'update':
                newObjects = newObjects.map((obj) =>
                  obj.id === action.id ? { ...obj, ...action.updates } : obj
                );
                break;
            }
            return {
              objects: newObjects,
              historyIndex: historyIndex + 1,
            };
          });
        }
      },

      setViewMode: (mode) => {
        set({ viewMode: mode });
      },

      toggleGrid: () => {
        set((state) => ({ gridEnabled: !state.gridEnabled }));
      },

      toggleMeasurements: () => {
        set((state) => ({ measurementsEnabled: !state.measurementsEnabled }));
      },

      saveProject: async (name) => {
        const state = get();
        const projectData = {
          objects: state.objects,
          viewMode: state.viewMode,
          gridEnabled: state.gridEnabled,
          measurementsEnabled: state.measurementsEnabled,
        };
        await localforage.setItem(`project_${name}`, projectData);
      },

      loadProject: async (name) => {
        const projectData = await localforage.getItem(`project_${name}`);
        if (projectData) {
          set({
            ...projectData,
            history: [],
            historyIndex: -1,
            selectedObject: null,
          });
        }
      },
    }),
    {
      name: 'interior-designer-storage',
      getStorage: () => localforage,
    }
  )
);

export default useProjectStore;
