import './christmas-spotlight.css'

export function ChristmasSpotlight() {
  return (
    <section className="orion-christmas-spotlight" aria-labelledby="orion-christmas-title">
      <img src="/christmas/images/merry-christmas.jpg" width="700" height="980"
           loading="lazy" alt="The Orion Nebula inside a red Christmas ornament" />
      <div>
        <h2 id="orion-christmas-title">Christmas under Orion</h2>
        <p>Four Christmas cards made with the Orion Nebula, Horsehead and Flame. Add a greeting and send one to someone you love.</p>
        <a href="/christmas/">Send an Orion Christmas card <span aria-hidden="true">↗</span></a>
      </div>
    </section>
  )
}
