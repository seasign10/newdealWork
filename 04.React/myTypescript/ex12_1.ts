export interface ISquere{ // 정사각형
  tag:'squere';
  size:number;
}
export interface IRectangle{ // 직사각형
  tag:'rectangle';
  width:number;
  height:number;
}
export interface ICircle{ // 원
  tag:'circle';
  radius:number;  
}
export type IShape = ISquere | IRectangle | ICircle;