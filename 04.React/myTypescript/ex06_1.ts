// 사원 인터페이스를 구현하고 export
export interface IEmp{
    empId: number;
    empName: string;
    empSal: number;
    empDep: string;
    empJoinDate: Date;
    empActive: boolean;
}
// 회사 인터페이스를 구현하고 export
export interface ICmp{
    cmpId: number;
    cmpName: string;
    cmpLocation: string;
    cmpEmps: IEmp[];
}