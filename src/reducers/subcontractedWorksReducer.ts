/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import api from "../api/ijengaApi";
import { constants } from "../helpers/constants";

interface SubcontractedWork {
  id: string;
  project: string;
  task_title: string;
  task_description: string;
  task_category: string;
  task_cost_labor: number;
  task_cost_overhead: number;
}

interface SubcontractedWorkState {
  subcontractedWorks: SubcontractedWork[];
  selectedWork: SubcontractedWork | null;
  loading: boolean;
  error: string | null;
}

const initialState: SubcontractedWorkState = {
  subcontractedWorks: [],
  selectedWork: null,
  loading: false,
  error: null,
};

export const createSubcontractedWork = createAsyncThunk(
  "subcontractedWork/create",
  async (
    workData: Omit<SubcontractedWork, "id">, 
    { rejectWithValue }
  ) => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) return rejectWithValue("Unauthorized: No authentication token found.");

      const response = await api.post(
        constants.endpoints.subcontractor_works.create_subcontracted_work, 
        workData, 
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      return {
        id: response.data.data.work_id,
        project: response.data.data.project,
        assigned_subcontractor: response.data.data.assigned_subcontractor,
        task_title: response.data.data.task_title,
        task_description: response.data.data.task_description,
        task_category: response.data.data.task_category || "other",
        task_cost_labor: parseFloat(response.data.data.task_cost_labor),
        task_cost_overhead: parseFloat(response.data.data.task_cost_overhead),
      };
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.detail || "Failed to create subcontracted work");
    }
  }
);

export const fetchSubcontractedWorks = createAsyncThunk(
  "subcontractedWork/fetchSubcontractedWorks",
  async (projectId: string, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) return rejectWithValue("Unauthorized: No authentication token found.");

      if (!projectId) return rejectWithValue("Project ID is missing before API call.");

      const response = await api.get(
        `${constants.endpoints.subcontractor_works.get_subcontracted_works}${projectId}`, 
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      return response.data.data.map((work: any) => ({
        id: work.work_id, 
        project: work.project,
        assigned_subcontractor: work.assigned_subcontractor, 
        task_title: work.task_title,
        task_description: work.task_description,
        task_category: work.task_category || "other",
        task_cost_labor: parseFloat(work.task_cost_labor),
        task_cost_overhead: parseFloat(work.task_cost_overhead),
      }));
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch subcontracted works");
    }
  }
);

export const fetchSubcontractedWorkDetails = createAsyncThunk(
  "subcontractedWork/fetchDetails",
  async ({ projectId, workId }: { projectId: string; workId: string }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) return rejectWithValue("Unauthorized: No authentication token found.");

      const url = `${constants.endpoints.subcontractor_works.get_subcontracted_works_details}?project_id=${projectId}&work_id=${workId}`;

      const response = await api.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.detail || "Failed to fetch work details");
    }
  }
);


const subcontractedWorkSlice = createSlice({
  name: "subcontractedWork",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createSubcontractedWork.pending, (state) => {
        state.loading = true;
      })
      .addCase(createSubcontractedWork.fulfilled, (state, action: PayloadAction<SubcontractedWork>) => {
        state.loading = false;
        state.subcontractedWorks.push(action.payload);
      })
      .addCase(createSubcontractedWork.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(fetchSubcontractedWorks.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSubcontractedWorks.fulfilled, (state, action: PayloadAction<SubcontractedWork[]>) => {
        state.loading = false;
        state.subcontractedWorks = action.payload;
      })
      .addCase(fetchSubcontractedWorks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchSubcontractedWorkDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSubcontractedWorkDetails.fulfilled, (state, action) => {
        state.selectedWork = action.payload;
        state.loading = false;
      })
      .addCase(fetchSubcontractedWorkDetails.rejected, (state, action) => {
        state.error = action.payload as string;
        state.loading = false;
      });
  },
});

export default subcontractedWorkSlice.reducer;
