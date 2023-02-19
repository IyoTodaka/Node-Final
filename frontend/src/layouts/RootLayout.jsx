
// 渡されるのはオブジェクト型のchildren
export default function RootLayout({children}){
    return(
        <div>
            <div>
                {children}
            </div>
        </div>
    )
    
}