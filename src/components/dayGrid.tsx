

export default function DayGrid () {

    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    const dayGrid = days.map((day) => {
        <p>{day}</p>
    });
    
    return (
        <div className={styles.dayGrid}>
            {dayGrid}     
        </div>
    )
}