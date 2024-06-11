// 여러 개의 컴포넌트를 export
// export defalt로는 하나의 컴포넌트만 내보낼 수 있음
function GetBrand(){
    return <h2>노트북은 MAC 입니다.</h2>
}
function GetOS(){
    return <h2>OS는 macOS Big Sur 입니다.</h2>
}
export {GetBrand, GetOS};