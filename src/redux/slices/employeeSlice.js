import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// ──────────────────────────────
// DUMMY API ENDPOINTS
// ──────────────────────────────
const DUMMY_API = "https://jsonplaceholder.typicode.com/users";

// http://localhost:4000/api/admin/get-allVerify-employee
// http://localhost:4000/api/admin/verifyEmployee/IGEMP20250000


// ──────────────────────────────
// ASYNC THUNKS
// ──────────────────────────────

// 1️ FETCH ALL EMPLOYEES
export const fetchAllUnverifiedEmployees = createAsyncThunk(
    "employees/fetchAll",
    async (_, { rejectWithValue }) => {
        try {
            const res = await fetch("http://localhost:4000/api/admin/get-UnverifiedEmployees");
            if (!res.ok) {
                const errorData = await res.json();
                return rejectWithValue(errorData);
            }
            const data = await res.json();
            return data.map(user => ({
                id: user.id,
                firstName: user.name.split(" ")[0],
                lastName: user.name.split(" ")[1] || "",
                email: user.email,
                phone: user.phone,
                employeeType: "full-time",
                permission: [],
            }));
        } catch (error) {
            return rejectWithValue({ message: error.message });
        }
    }
);

// 2️ ADD NEW EMPLOYEE
export const addNewEmployee = createAsyncThunk(
    "employees/addNew",
    async (employeeData, { rejectWithValue }) => {
        try {
            const res = await fetch("http://localhost:4000/api/admin/addnewemployee", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(employeeData),
            });

            if (!res.ok) {
                const errorData = await res.json();
                return rejectWithValue(errorData);
            }

            const data = await res.json();
            // Use the ID returned by backend
            return { ...employeeData, id: data.data.id };
        } catch (error) {
            return rejectWithValue({ message: error.message });
        }
    }
);


//  FETCH ALL VERIFIED EMPLOYEES
export const fetchAllVerifiedEmployees = createAsyncThunk(
    "employees/fetchAllVerified",
    async (_, { rejectWithValue }) => {
        try {
            const res = await fetch("http://localhost:4000/api/admin/get-allVerify-employee", {
                method: "GET",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
            });

            const data = await res.json();

            if (!res.ok) {
                return rejectWithValue(data);
            }

            // Extract data safely
            let employees = data?.data || [];

            // ✅ Extra safety: ensure only verified employees are kept
            employees = employees.filter(emp => emp.verifiedEmployee === true);

            // Map to frontend-friendly structure
            return employees.map(emp => ({
                id: emp._id,
                employeeId: emp.employeeId,
                firstName: emp.firstName,
                lastName: emp.lastName,
                email: emp.email,
                phone: emp.phone,
                employeeType: emp.employeeType || "N/A",
                loginRestricted: emp.loginRestricted || false,
                permission: emp.permission || [],
                formalSituation: emp.formalSituation || "",
                createdAt: emp.createdAt,
            }));
        } catch (error) {
            return rejectWithValue({ message: error.message });
        }
    }
);



// 3️ UPDATE EMPLOYEE
export const updateEmployeeAsync = createAsyncThunk(
    "employees/update",
    async ({ id, updatedData }, { rejectWithValue }) => {
        try {
            const res = await fetch(`${DUMMY_API}/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedData),
            });
            if (!res.ok) {
                const errorData = await res.json();
                return rejectWithValue(errorData);
            }
            const data = await res.json();
            return { ...updatedData, id };
        } catch (error) {
            return rejectWithValue({ message: error.message });
        }
    }
);

// 4️ DELETE EMPLOYEE
export const deleteEmployeeAsync = createAsyncThunk(
    "employees/delete",
    async (id, { rejectWithValue }) => {
        try {
            const res = await fetch(`${DUMMY_API}/${id}`, { method: "DELETE" });
            if (!res.ok) {
                const errorData = await res.json();
                return rejectWithValue(errorData);
            }
            return id;
        } catch (error) {
            return rejectWithValue({ message: error.message });
        }
    }
);

// ──────────────────────────────
// INITIAL STATE
// ──────────────────────────────
const initialState = {
    employees: [],
    loading: false,
    error: null,
};

// ──────────────────────────────
// EMPLOYEE SLICE
// ──────────────────────────────
const employeeSlice = createSlice({
    name: "employees",
    initialState,
    reducers: {
        // ── EMPLOYEE CRUD ──
        addEmployee: (state, action) => {
            state.employees.push(action.payload);
        },
        updateEmployee: (state, action) => {
            const updated = action.payload;
            const index = state.employees.findIndex(emp => emp.id === updated.id);
            if (index !== -1) state.employees[index] = { ...state.employees[index], ...updated };
        },
        deleteEmployee: (state, action) => {
            state.employees = state.employees.filter(emp => emp.id !== action.payload);
        },

        // ── PERMISSION HANDLING ──
        addPermission: (state, action) => {
            const { employeeId, customPermissions } = action.payload;
            const emp = state.employees.find(emp => emp.id === employeeId);
            if (emp) emp.permission.push({ permissionType: "custom", customPermissions });
        },
        updatePermission: (state, action) => {
            const { employeeId, permission } = action.payload;
            const emp = state.employees.find(emp => emp.id === employeeId);
            if (emp) emp.permission = permission;
        },
        deletePermission: (state, action) => {
            const { employeeId } = action.payload;
            const emp = state.employees.find(emp => emp.id === employeeId);
            if (emp) emp.permission = [];
        },
    },
    extraReducers: (builder) => {
        builder
            // FETCH ALL
            .addCase(fetchAllUnverifiedEmployees.pending, (state) => { state.loading = true; state.error = null; })
            .addCase(fetchAllUnverifiedEmployees.fulfilled, (state, action) => { state.loading = false; state.employees = action.payload; })
            .addCase(fetchAllUnverifiedEmployees.rejected, (state, action) => { state.loading = false; state.error = action.payload?.message; })

            // ADD NEW
            .addCase(addNewEmployee.pending, (state) => { state.loading = true; state.error = null; })
            .addCase(addNewEmployee.fulfilled, (state, action) => { state.loading = false; state.employees.push(action.payload); })
            .addCase(addNewEmployee.rejected, (state, action) => { state.loading = false; state.error = action.payload?.message; })


            .addCase(fetchAllVerifiedEmployees.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAllVerifiedEmployees.fulfilled, (state, action) => {
                state.loading = false;
                state.employees = action.payload;
            })
            .addCase(fetchAllVerifiedEmployees.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message;
            })


            // UPDATE
            .addCase(updateEmployeeAsync.pending, (state) => { state.loading = true; state.error = null; })
            .addCase(updateEmployeeAsync.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.employees.findIndex(emp => emp.id === action.payload.id);
                if (index !== -1) state.employees[index] = action.payload;
            })
            .addCase(updateEmployeeAsync.rejected, (state, action) => { state.loading = false; state.error = action.payload?.message; })

            // DELETE
            .addCase(deleteEmployeeAsync.pending, (state) => { state.loading = true; state.error = null; })
            .addCase(deleteEmployeeAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.employees = state.employees.filter(emp => emp.id !== action.payload);
            })
            .addCase(deleteEmployeeAsync.rejected, (state, action) => { state.loading = false; state.error = action.payload?.message; });
    },
});

// ──────────────────────────────
// EXPORT ACTIONS & SELECTORS
// ──────────────────────────────
export const {
    addEmployee,
    updateEmployee,
    deleteEmployee,
    addPermission,
    updatePermission,
    deletePermission,
} = employeeSlice.actions;

export const { clearEmployeeError } = employeeSlice.actions;
export const selectAllEmployees = state => state.employees.employees;
export const selectEmployeeLoading = state => state.employees.loading;
export const selectEmployeeError = state => state.employees.error;

// ──────────────────────────────
// EXPORT REDUCER
// ──────────────────────────────
export default employeeSlice.reducer;
