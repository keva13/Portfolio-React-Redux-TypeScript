
 class AppConfig {
    public readonly developer = 'Yuri_Voluykevich';
    public readonly apiUrl = 'https://uxcandy.com/~shapoval/test-task-backend/';
  }
  
export default new AppConfig()

export const sortField = ["id", "username", "status", "email"];
export const sortDirection = ["asc", "desc"];
export const taskStatus = {
  0 : "задача не выполнена",
  1 : "задача не выполнена, отредактирована админом",
  10 : "задача выполнена",
  11 : "задача отредактирована админом и выполнена"
};