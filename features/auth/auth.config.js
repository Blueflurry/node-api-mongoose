module.exports = {
    // User Workspace Relationship
    userWorkspaceRoles: Object.freeze({
        guest: 0,
        user: 1,
        admin: 2,
    }),
    // Type of Workspaces
    workspaceTypes: Object.freeze({
        profile: 0,
        company: 1,
        group: 2,
    }),
    // Scope of Workspaces
    workspaceScopes: Object.freeze({
        profile: 0, // You can have multiple groups and companies scoped to a profile
        company: 1, // You can have multiple groups and profiles scoped to a company
        group: 2, // You can have multiple companies and profiles scoped to a group
    }),
    // Status of Workspace
    workspaceStatus: Object.freeze({
        disabled: -1,
        unauthorized: 0,
        active: 1,
    }),
};
