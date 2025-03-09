// Utilidades para manejar el registro de usuarios en Vercel Edge Config 
export async function getUsers() {
    // Implementar la obtención de usuarios desde Vercel Edge Config
    print(`user getted`)
    return [];
  }
  
  export async function addUser(user) {
    // Implementar la lógica para agregar un usuario a Edge Config
    print(`user${user} added`)
    return true;
  }
  
  export async function getProject() {
    // Implementar la obtención de usuarios desde Vercel Edge Config
    print(`Project getted`)
    return [];
  }
  
  export async function addProject(user) {
    // Implementar la lógica para agregar un usuario a Edge Config
    print(`Project ${user} added`)
    return true;
  }