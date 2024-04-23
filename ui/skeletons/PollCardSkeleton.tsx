import styles from "@/ui/polls/Poll/Polls.module.css"
import { LoadingPropsPolls } from "@/lib/types"

const Loader = ({count}: LoadingPropsPolls) => {
  return (
    <>
    {Array.from({length: count},  (_,index) => (
    <div key={index}>
      <section className={styles.image_container}>
        <div className={styles.shimmer} style={{ width: '100%', height: '250px', borderRadius: '10pt 10pt 0pt 0pt'}}></div>
      </section>
      <section className={styles.bottom_part}>
        <div className={styles.shimmer} style={{width: '70%', height: '20px', marginBottom: '0.75em'}}></div>
        <div className={styles.shimmer} style={{width: '40%', height: '20px', marginBottom: '0.75em'}}></div>
        <div className={styles.shimmer} style={{width: '30%', height: '20px', marginBottom: '0.75em'}}></div>
        <div className={styles.shimmer} style={{width: '30%', height: '20px', marginBottom: '0.75em'}}></div>
        <div className={styles.shimmer} style={{width: '60%', height: '20px', margin: "0.5em auto"}}></div>
      </section>
    </div>
   ))}
    </>
    )
}

export default Loader
