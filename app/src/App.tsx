import "./assets/App.css";
import ThreeScene from "./component/ThreeScene";
import ShowCom from "./component/ShowCom";
// import SliderCom from "./component/SliderCom";
// import EchartsCom from "./component/EchartsCom";

// import LoadingScene from "./component/LoadingScene";
// import { useEffect, useState } from "react";


function App() {
  // const [loading, setLoading] = useState(true);
  // const [progress, setProgress] = useState(0);
  // useEffect(() => {
  //   // const loading = async () => {
  //   //   try {
  //   //     const res = await fetch('/output/manifest.json')
  //   //     const data = await res.json()
  //   //     if (!res.ok) throw new Error('无法加载 manifest.json');
  //   //     console.log(data);
  //   //     const { files } = data;
  //   //     if (files.length === 0) {
  //   //       setLoading(false);
  //   //       return
  //   //     }
  //   //     for (let i = 0; i < files.length; i++) {
  //   //       const file = files[i];
  //   //       console.log(`正在加载: ${file}`);

  //   //       try {
  //   //         const fileRes = await fetch(file);
  //   //         if (!fileRes.ok) throw new Error(`加载失败: ${file}`);
  //   //         // 读取内容（arrayBuffer 或 blob），触发真实下载
  //   //         await fileRes.arrayBuffer();
  //   //       } catch (err) {
  //   //         console.warn(err);
  //   //       }
  //   //       // 更新进度
  //   //       // setProgress(Math.round(((i + 1) / files.length) * 100));
  //   //     }

  //   //   }
  //   //   catch (err) {
  //   //     console.error("🔥 加载过程出错:", err);
  //   //   } finally {
  //   //     // ✅ 关键：无论成功还是失败，都要关闭 loading！
  //   //     setTimeout(() => setLoading(false), 300);
  //   //   }

  //   // }
  //   // loading()

  // }, [])

  // if (loading) {
  //   return (
  //     <div>
  //       {/* <LoadingScene progress={progress} /> */}
  //     </div>
  //   )
  // }
  return (
    <div style={{ position: 'relative' }}>

      <div style={{ width: '100vw', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }
      }>
        <ThreeScene style={{ width: '100vw', height: '100vh' }} />
      </div >
      <div style={{ width: "380px", height: '200px', backgroundColor: '8ac8e7ff', position: 'absolute', bottom: '10%', left: '50%', transform: 'translateX(-50%)' }}>
        <ShowCom />
      </div>
      {/* <div style={{ display: 'flex', flexDirection: 'column', width: '300px', height: '800px', position: 'absolute', bottom: '1%', right: '1%', backgroundColor: "#8ac8e7ff" }}>
        <div style={{
          width: '300px',
          flex: '1'
        }}>
          <EchartsCom />
        </div>
        <div style={{
          width: '300px',
          flex: '1'
        }}>
          <EchartsCom />
        </div>
      </div> */}

    </div >
  );
}

export default App;
