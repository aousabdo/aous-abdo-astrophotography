import objects from './science-objects.json'
import type { Photograph, View } from './gallery'
export type Source = { title:string; url:string }
export type ScienceObject = {kind:string;where:string;lead:string;topic:string}
export const scienceObjects:Record<string,ScienceObject> = objects
const nasa = (title:string,path:string):Source => ({title,url:`https://science.nasa.gov/${path}`})
export const sources = {
 nebulae:nasa('NASA · How nebulae shine','mission/hubble/science/universe-uncovered/hubble-nebulae/'),
 galaxies:nasa('NASA · Galaxies','universe/galaxies/'),
 stars:nasa('NASA · Stars','universe/stars/'),
 iris:nasa('NASA · Iris Nebula / Caldwell 4','mission/hubble/science/explore-the-night-sky/hubble-caldwell-catalog/caldwell-4/'),
 orion:nasa('NASA · Orion Nebula / M42','mission/hubble/science/explore-the-night-sky/hubble-messier-catalog/messier-42/'),
 helix:nasa('NASA · Helix Nebula / Caldwell 63','mission/hubble/science/explore-the-night-sky/hubble-caldwell-catalog/caldwell-63/'),
 sun:nasa('NASA · Sun facts','sun/facts/'),
 sunspots:{title:'NASA Marshall · Solar surface',url:'https://solarscience.msfc.nasa.gov/surface.shtml'},
 rotation:{title:'NASA Marshall · Solar rotation',url:'https://solarscience.msfc.nasa.gov/sunturn.shtml'},
 moon:nasa('NASA · Moon facts','moon/facts/'),
 formation:nasa('NASA · How the Moon formed','moon/formation/'),
 craters:nasa('NASA · Lunar craters and terrain','moon/lunar-craters/'),
 phases:nasa('NASA · Moon phases','moon/moon-phases/'),
 saturn:nasa('NASA · Saturn facts','saturn/facts/'),
 colors:{title:'ESA / Webb · Astronomical image processing and color',url:'https://esawebb.org/about/general/image-processing/'},
 ionization:{title:'NRAO · Ionized gas and ionization balance',url:'https://www.cv.nrao.edu/~sransom/web/Ch4.html'},
 extinction:{title:'Draine · Interstellar dust (NASA/IPAC)',url:'https://ned.ipac.caltech.edu/level5/March01/Draine/Draine.html'},
}
export const topics:Record<string,{title:string;physics:string;formation:string;question:string;source:Source}> = {
 reflection:{title:'Borrowed light',physics:'A dust grain redirects some of a star’s light into our line of sight. The observed color depends on the illuminating star, the grain sizes, viewing geometry and extinction along the path. Blue reflection light and dark absorption can occur in the same cloud.',formation:'These clouds are part of the interstellar medium: gas mixed with a small amount of solid dust. Gravity can concentrate material into denser regions. A reflection nebula marks illumination; its blue glow alone does not prove that stars are forming at that exact location.',question:'Where does the cloud brighten beside a star, and where does it erase the background?',source:sources.nebulae},
 dust:{title:'Seeing material through missing light',physics:'Dust absorbs and scatters visible light out of the line of sight. Shorter wavelengths are usually attenuated more strongly, so stars behind a moderate column can look redder; a thicker column can hide them entirely.',formation:'Turbulence, gravity and stellar feedback structure interstellar clouds. Some dense regions may collapse into stars, but a visible silhouette is not by itself evidence for a collapsing core. Infrared emission, spectroscopy and distance measurements reveal what a photograph cannot.',question:'Does a dark feature coincide with fewer visible background stars?',source:sources.extinction},
 emission:{title:'Atoms turn stellar energy into light',physics:'Energetic ultraviolet photons can ionize hydrogen. Recombination and subsequent atomic transitions produce emission lines. Oxygen and sulfur lines trace different ionization and excitation conditions; their brightness also depends on density, temperature and abundance.',formation:'Stars are born in cold, dense gas. Once massive stars form, their radiation and winds heat, erode and reshape their surroundings. A bright rim is an interface in that process; it does not by itself establish whether feedback triggered a particular star to form.',question:'Where do glowing rims meet the darker, denser material?',source:sources.nebulae},
 wind:{title:'A star reshapes its surroundings',physics:'A stellar wind carries mass and energy away from a star. When it encounters surrounding material, it can compress gas into a shell and drive shocks. Radiation and collisional excitation then make parts of the structure visible.',formation:'Mass loss changes during a massive star’s life. A fast wind can overtake older, slower ejecta or sweep up ambient gas. Shells therefore preserve clues to both the star’s history and the uneven environment into which it expands.',question:'How might a denser environment change the shape of an expanding bubble?',source:sources.nebulae},
 planetary:{title:'A star’s atmosphere, returned to space',physics:'A hot exposed stellar core emits ultraviolet radiation that ionizes previously expelled gas. Different ions occupy overlapping zones, so hydrogen and oxygen can draw different structures in the same nebula.',formation:'After a low- or intermediate-mass star evolves through giant phases, it loses its outer envelope. Its core becomes a white dwarf as the surrounding material disperses. This is a planetary-nebula stage; the name is historical and has no connection to planet formation.',question:'Does the bright ring need to be a flat ring in three dimensions?',source:sources.nebulae},
 galaxy:{title:'A system of stars, gas, dust and dark matter',physics:'The smooth glow combines the light of unresolved stars. Dust lanes absorb some of that light, while young stars and ionized gas can outline star-forming regions. Gravity governs the motions, but a still photograph does not provide a rotation curve.',formation:'Galaxies grow through gas accretion, star formation and interactions or mergers. Their shapes reflect long histories. Our viewing angle can make a disk look like a broad spiral or a thin streak; spectroscopy and multiwavelength observations complete the picture.',question:'Which structures trace stars, and which are revealed by light being blocked?',source:sources.galaxies},
 field:{title:'A deep view compressed into a flat image',physics:'Each point is a different line of sight. A star’s apparent brightness depends on luminosity, distance and intervening dust. Star color contains information about temperature and extinction, but processing also affects the rendered color.',formation:'The Milky Way contains stars of many ages and birthplaces. Their apparent proximity in an image does not show that they formed together. Astronomers use parallax, motion and spectra to identify genuine populations and clusters.',question:'What extra measurement would distinguish a nearby faint star from a distant luminous one?',source:sources.stars},
 cluster:{title:'Stars with a shared history',physics:'Gravity helps bind a cluster, while close encounters and the Galaxy’s tidal field influence its evolution. A color–magnitude diagram lets astronomers compare members with stellar-evolution models and estimate a cluster’s age.',formation:'Stars form in groups inside molecular clouds. Loose open clusters and dense, ancient globular clusters have different populations and histories. A photograph shows their projected density; motion measurements establish membership.',question:'How would a cluster’s appearance change as its most massive stars evolve?',source:sources.stars},
 supernova:{title:'The glowing aftermath of an explosion',physics:'An expanding blast wave shocks interstellar gas and previously ejected material. Thin bright filaments can be sheets of shocked gas seen nearly edge-on. Different emission lines respond to different conditions behind the shock.',formation:'A supernova can eject stellar material and transfer enormous energy into its environment. Its remnant expands, sweeps up gas and gradually slows. This is physically different from a planetary nebula produced by envelope loss from a less massive star.',question:'Why might a thin sheet appear brightest when viewed along its edge?',source:sources.nebulae},
 sun:{title:'A magnetic, luminous star',physics:'Nuclear fusion supplies energy in the core. That energy is transported outward and eventually escapes as light from the photosphere. Magnetic fields alter the flow of hot material and produce cooler sunspots.',formation:'The Sun formed as a cloud collapsed roughly 4.6 billion years ago. It is now a main-sequence star sustained by hydrogen fusion in its core. The visible surface is a layer of plasma, not a solid shell.',question:'Why does a cooler sunspot look dark against a brighter photosphere?',source:sources.sun},
 moon:{title:'A rocky world lit by the Sun',physics:'The Moon reflects sunlight. Its phase depends on the Sun–Moon–observer geometry; phases are not normally caused by Earth’s shadow. Surface relief is easiest to read where the Sun is low near the day–night boundary.',formation:'The leading explanation is that the Moon formed from debris after a giant impact involving early Earth. Impacts later excavated basins, and volcanic lavas filled some lowlands to form the dark maria. Many details of the early history remain active research.',question:'Why do nearly full views emphasize rays and brightness more than long crater shadows?',source:sources.moon},
 saturn:{title:'A planet and its orbiting ice',physics:'Saturn and its rings reflect sunlight. The rings contain countless particles, mostly water ice, moving in separate orbits. Their apparent opening depends on geometry, rather than the rings becoming physically thinner.',formation:'Saturn formed in the young Solar System by accumulating gas around a growing core. The origin and age of its rings are still debated; a single image cannot resolve that history.',question:'Why does the ring angle change during Saturn’s orbit?',source:sources.saturn},
}
export type Hotspot={x:number;y:number;title:string;text:string}
export type DeepDive={title:string;subtitle:string;distance:string;scale:string;sections:{title:string;text:string}[];hotspots:Hotspot[];journey:[string,string][];sources:Source[];link?:{title:string;url:string}}
export const deepDives:Record<string,DeepDive>={
 iris:{title:'A cloud made visible by one star',subtitle:'The Iris · dust, scattering and the spaces between stars',distance:'About 1,400 light-years',scale:'Bright nebula: roughly 6 light-years across',sections:[
 {title:'A spotlight inside the cloud',text:'The Iris is not a blue fire. A hot star illuminates nearby interstellar dust, and some of that light is scattered toward Earth. The blue central reflection nebula is embedded in a larger dark cloud in Cepheus. The illuminating star’s energy, the dust and our viewing direction all contribute to what we see.'},
 {title:'One material, two appearances',text:'Near the light source, dust can be bright enough to photograph by scattered light. Farther out, or along a denser line of sight, it mostly removes background starlight. The luminous blue patch and the dark lanes are two expressions of the same light–matter interaction. Grain size distributions and extinction matter; interstellar dust is not a pure Rayleigh-scattering gas.'},
 {title:'From cloud to stellar neighborhood',text:'The dusty environment belongs to the gas-and-dust reservoir from which stars can form. Gravity acts alongside turbulence, magnetic fields and heating. This visible-light image maps illumination and obscuration; it cannot determine the mass, collapse state or age of an individual dark clump. Infrared observations and spectra provide complementary evidence.'},
 {title:'Reading this photograph',text:'The featured Origin view combines 9.9 hours of integration. Long integration reveals faint light, while the final stretch and color treatment make its range visible on a screen. Brightness in this processed image is not a calibrated dust-density map. Distances and quoted extent are approximate; the entire photographed dusty field is wider than the bright nebula.'}],
 hotspots:[{x:50,y:54,title:'Blue reflection light',text:'Dust close to the illuminating star scatters starlight into our view. The glow is borrowed light.'},{x:61,y:44,title:'Opaque lanes',text:'A dense column removes background light. Darkness here marks obscuration, rather than a hole in the Galaxy.'},{x:26,y:34,title:'Faint outer dust',text:'Subtle brown structure appears far beyond the bright core. Its rendered brightness depends strongly on integration and processing.'}],
 journey:[['A star emits','Light leaves the illuminating star’s outer layers.'],['A grain redirects','A dust grain scatters a small fraction toward Earth. Other photons are absorbed or sent elsewhere.'],['Across interstellar space','The region is about 1,400 light-years away; this is an approximate light-travel distance, not the age of the cloud.'],['From photon to pixel','The telescope gathers light; the sensor converts absorbed photons into charge. Calibration, registration, stacking and a display stretch reveal the recorded signal.']],sources:[sources.iris,sources.extinction,sources.colors]},
 orion:{title:'A nursery that reshapes itself',subtitle:'Orion · gravity, ionization and stellar feedback',distance:'About 1,500 light-years',scale:'A stellar nursery inside a larger molecular cloud',sections:[
 {title:'New stars light the gas',text:'The Orion Nebula is a nearby view of ongoing star formation. Massive young stars in its central Trapezium supply ultraviolet photons that ionize surrounding gas. When electrons recombine with ions and atoms change energy states, the gas releases light in characteristic lines. The cloud is both a birthplace and a place being transformed by its newborn stars.'},
 {title:'Birth and erosion coexist',text:'Stars begin in cold, dense gas, where gravity can overcome support from thermal motion, turbulence and magnetic fields. Radiation and winds then excavate cavities and erode exposed material. Some young stars retain disks of gas and dust. Those disks are known from higher-resolution observations; they are not individually resolved in this backyard image.'},
 {title:'Why the colors differ between views',text:'The selected HOO palette maps hydrogen-alpha primarily into red and doubly ionized oxygen into green and blue. The SHO alternative maps sulfur, hydrogen and oxygen into display channels. These are ways to separate structures spectrally, not literal naked-eye colors or direct chemical-abundance maps. Temperature, density and excitation affect line strength too.'},
 {title:'A bright core, a faint envelope',text:'The central region is much brighter than the outer nebulosity. An exposure blend preserves information across that range. Saturation, atmospheric seeing and telescope resolution limit the smallest details. The lab below isolates ionization balance in a simple uniform sphere; actual Orion is clumpy, dusty and dynamically evolving.'}],
 hotspots:[{x:45,y:61,title:'Bright central region',text:'The Trapezium lies in the bright core. Its massive stars power much of the visible ionization; this pin marks a region, not a resolved inventory of stars.'},{x:62,y:54,title:'Dark cloud boundary',text:'Dust blocks light beside the luminous gas. A flat image mixes material at different depths.'},{x:35,y:30,title:'Fainter outer emission',text:'A long integration reveals emission much fainter than the core. Its display color depends on the selected palette.'}],
 journey:[['An ultraviolet photon','A massive young star emits a photon energetic enough to ionize hydrogen.'],['An atom responds','That photon is absorbed. Later, recombination and a cascade of transitions can produce new lower-energy photons, including hydrogen-alpha.'],['A red line crosses space','An Hα photon has a wavelength near 656.3 nm. Its energy is smaller than that of the original ionizing photon.'],['A palette makes structure visible','Filters and a color sensor record selected wavelength ranges. Processing assigns the recorded signals to display channels.']],sources:[sources.orion,sources.ionization,sources.colors],link:{title:'Explore stellar lives in Najm',url:'https://najm.analyticadss.com/'}},
 helix:{title:'A star returns its atmosphere',subtitle:'The Helix · glowing shells and a stellar remnant',distance:'About 650 light-years',scale:'Bright ring: about 3 light-years across',sections:[
 {title:'A different kind of stellar ending',text:'The Helix is a planetary nebula: gas expelled during the late evolution of a low- or intermediate-mass star. A hot remnant core provides ultraviolet radiation that makes that gas glow. The star is becoming a white dwarf. This is envelope loss, rather than the core-collapse explosion responsible for a supernova remnant such as the Veil.'},
 {title:'A ring is a projection',text:'The familiar eye-like shape is a view through a more complicated three-dimensional structure. Brightness can increase where our line of sight crosses more emitting material. Knots and multiple components are documented in high-resolution observations, but this image should not be used to identify every tiny knot or reconstruct the full geometry.'},
 {title:'Hydrogen and oxygen tell different stories',text:'The hydrogen/oxygen renderings distinguish overlapping ionized regions. A cyan interior and a warmer rim help reveal structure, but the display palette is a choice. Ionization state, temperature, density and geometry all affect the pattern. A blue-looking region is not simply a place containing only oxygen.'},
 {title:'The shell does not keep one perfect clock',text:'Dividing a physical radius by an expansion speed gives a useful dynamical timescale. It is not automatically the stellar age or an exact time since ejection: projection, acceleration, deceleration and multiple mass-loss episodes complicate the inference. The small lab lets you see that dependency without claiming a new measurement of the Helix.'}],
 hotspots:[{x:50,y:50,title:'Inner ionized region',text:'The hot central remnant illuminates the surrounding gas. The pin identifies the interior region; it does not claim the remnant is resolved here.'},{x:59,y:57,title:'Bright projected rim',text:'A longer path through emitting gas can brighten a rim. A ring on the screen need not be a flat ring in space.'},{x:41,y:36,title:'Fainter outer structure',text:'The nebula extends beyond its brightest ring. Its faint features are especially sensitive to sky background and processing.'}],
 journey:[['A hot exposed core','After envelope loss, the compact central remnant emits strong ultraviolet radiation.'],['Expelled gas glows','Ionization, recombination and excitation create line photons in the surrounding material.'],['A long journey','Light travels roughly 650 years from this nearby nebula to Earth. That travel time is separate from the shell’s evolution.'],['Many nights, one view','Recorded hydrogen and oxygen signals are calibrated and combined. Alternate palettes display the same object in different ways.']],sources:[sources.helix,sources.nebulae,sources.colors],link:{title:'Explore the endings of stars',url:'https://aousabdo.github.io/stellar-death/'}},
 sun:{title:'A magnetic star in our own sky',subtitle:'The Sun · the photosphere, sunspots and differential rotation',distance:'About 8 minutes 20 seconds of light travel',scale:'Diameter: about 1.4 million km',sections:[
 {title:'Where visible sunlight escapes',text:'The photosphere is the layer from which most visible sunlight reaches us. Energy originates in the core through nuclear fusion and is transported outward before escaping. It is not meaningful to track a single original fusion photon all the way out unchanged: energy is repeatedly absorbed, re-emitted and redistributed inside the Sun.'},
 {title:'Dark spots on a luminous surface',text:'Sunspots are cooler than the surrounding photosphere. Strong magnetic fields inhibit the normal supply of heat by convection, reducing their brightness. They still emit abundant light. The warm full-disk rendering is a color treatment of white-light data; it is not an Hα view of prominences or a photograph of flames.'},
 {title:'The surface does not turn as one solid body',text:'The Sun is plasma. Equatorial regions rotate faster than high latitudes. The apparent rate also depends on whether it is measured relative to the stars or from an Earth that is moving around the Sun. The educational lab uses a deliberately simple sidereal-period curve; it is separate from the model used to render the video.'},
 {title:'What the rotation video really records',text:'The endpoints are observations from July 31 and August 1, 2026, at 11:31 UT: a real separation of 24 hours. Intermediate frames combine modeled differential rotation and a blend. The 15-second clip illustrates motion between two measured endpoints; it is not a continuously observed timelapse. The second film compares genuine raw footage with the processed stack.'}],
 hotspots:[{x:28,y:43,title:'Sunspot group',text:'Cooler magnetic regions appear dark against the brighter photosphere. This is a brightness contrast, not an absence of emission.'},{x:49,y:54,title:'Photosphere',text:'White-light imaging shows the visible-light surface layer. Fine detail is limited by atmospheric seeing, optics and sampling.'},{x:89,y:62,title:'Solar limb',text:'The edge appears dimmer because our viewing angle samples cooler, higher layers. Processing can change how strong the effect looks.'}],
 journey:[['Energy begins in the core','Fusion converts part of the reacting nuclei’s mass into energy.'],['Energy is redistributed','Repeated interactions and outward transport erase the identity of any one original photon.'],['A visible photon escapes','A photon leaving the photosphere can cross the Earth–Sun distance in about 8 minutes 20 seconds.'],['A safely filtered telescope records','Solar-filtered optics and a camera collect the light. Selected frames are registered, stacked and processed. Never view the Sun through unfiltered optics.']],sources:[sources.sun,sources.sunspots,sources.rotation]},
 moon:{title:'A world whose light comes from elsewhere',subtitle:'The Moon · impacts, lava plains and the geometry of sunlight',distance:'About 1.3 seconds of light travel',scale:'Diameter: about 3,475 km',sections:[
 {title:'A history written into terrain',text:'The leading model places the Moon’s origin in debris from a giant impact involving early Earth. Its surface was subsequently transformed by bombardment and volcanic activity. The bright highlands and darker maria preserve different parts of that history. The impact scenario has strong evidence, while the exact event and the Moon’s early evolution remain active research.'},
 {title:'The seas were lava',text:'The dark maria are plains of basaltic lava that filled low-lying regions, including large impact basins. Craters formed when impactors struck the surface. Some bright rays are ejecta spread away from relatively young craters. A full-looking Moon highlights those brightness contrasts; lower solar illumination angles make topographic shadows more conspicuous.'},
 {title:'What this color can and cannot tell us',text:'The main view emphasizes luminance. The enhanced two-band color alternative uses the ratio of light in narrow windows near Hα at 656 nm and [O III] at 500 nm. Here those filters record reflected sunlight, not lunar line emission. The result emphasizes spectral differences but is not a calibrated broadband mineral map or a measurement of mineral abundance.'},
 {title:'A tour, a still image, and real raw footage',text:'The guided tour animates a finished still with pans, zooms and labels. It is not an orbital flyover; upsampling a crop adds no new resolved detail. The raw-versus-stacked film shows genuine capture footage beside a processed result. Registration and stacking reduce random noise; sharpening and frame selection affect detail and require care.'}],
 hotspots:[{x:43,y:79,title:'Tycho and its rays',text:'A bright ray system spreads from Tycho across the southern highlands. Rays are impact ejecta, not cracks filled with light.'},{x:38,y:25,title:'Dark mare plains',text:'The large dark areas include basaltic plains. They are ancient volcanic surfaces rather than present-day seas.'},{x:64,y:64,title:'Bright cratered highlands',text:'Heavily cratered highland terrain contrasts with the darker plains. Near full illumination, albedo patterns often dominate over shadows.'}],
 journey:[['Sunlight arrives','Visible light from the Sun illuminates the lunar surface.'],['Rock redirects it','A small fraction is scattered back toward Earth; different terrains reflect differently.'],['A short final crossing','The lunar leg takes about 1.3 seconds at the Moon’s average distance. The full journey began at the Sun.'],['Frames become a portrait','A telescope records many short exposures through Earth’s turbulent atmosphere. Registration and stacking build a clearer view.']],sources:[sources.moon,sources.formation,sources.craters,sources.phases]},
}
export function colorNote(photo:Photograph,view?:View) {
 if(photo.id==='sun')return 'White-light data. Warm and grayscale versions are display renderings; this is not an Hα prominence image.'
 if(photo.id==='moon')return /color|band/i.test(view?.label||'')?'Enhanced two-band reflected sunlight (about 656 / 500 nm). This is not a calibrated mineral-abundance map.':'Luminance emphasizes terrain and brightness. The color alternative enhances two narrow spectral bands, not mineral abundances.'
 if(/SHO/i.test(view?.label||''))return 'SHO palette: sulfur → red, hydrogen → green, oxygen → blue. Display color separates line signals; it is not a direct abundance map.'
 if(/HOO/i.test(view?.label||''))return 'HOO palette: hydrogen-alpha → red; doubly ionized oxygen → green and blue. These are assigned display colors.'
 return 'A processed astronomical image. Stretch, color balance and any filter mapping affect appearance; compare the view label and capture notes. Color alone does not measure composition.'
}
export function objectSources(id:string):Source[] {
 if(deepDives[id])return deepDives[id].sources
 const o=scienceObjects[id];return o?[...(catalogSources[id] || []),topics[o.topic].source]:[]
}

const catalogSources:Record<string,Source[]> = {
  "seahorse": [
    {
      "title": "NASA \u00b7 vdB 152",
      "url": "https://science.nasa.gov/image-article/apod-2012-october-31-vdb-152-a-ghost-in-cepheus/"
    }
  ],
  "horsehead": [
    {
      "title": "NASA / Webb \u00b7 Horsehead",
      "url": "https://science.nasa.gov/missions/webb/webb-captures-top-of-iconic-horsehead-nebula-in-unprecedented-detail/"
    }
  ],
  "ngc1333": [
    {
      "title": "NASA / Hubble \u00b7 NGC 1333",
      "url": "https://science.nasa.gov/missions/hubble/hubble-touts-a-team-of-stars/"
    }
  ],
  "shark": [
    {
      "title": "NASA \u00b7 LDN 1235",
      "url": "https://science.nasa.gov/image-article/apod-2025-march-18-ldn-1235-the-shark-nebula/"
    }
  ],
  "heart": [
    {
      "title": "NASA \u00b7 Heart and Soul",
      "url": "https://www.nasa.gov/image-article/mosaic-of-cassiopeia/"
    }
  ],
  "ghost": [
    {
      "title": "NASA \u00b7 Ghost Nebula",
      "url": "https://science.nasa.gov/image-article/apod-2023-october-30-reflections-of-the-ghost-nebula/"
    }
  ],
  "ldn1147": [
    {
      "title": "Sharma et al. \u00b7 LDN 1147/1158",
      "url": "https://arxiv.org/abs/2005.02781"
    }
  ],
  "cocoon": [
    {
      "title": "NASA / JPL \u00b7 Cosmic Cocoon",
      "url": "https://www.jpl.nasa.gov/images/pia13441-cosmic-cocoon/"
    }
  ],
  "pelican": [
    {
      "title": "NASA \u00b7 Pelican ionization front",
      "url": "https://apod.nasa.gov/apod/ap161119.html"
    }
  ],
  "rho-ophiuchi": [
    {
      "title": "NASA / Webb \u00b7 Rho Ophiuchi",
      "url": "https://science.nasa.gov/missions/webb/webb-celebrates-first-year-of-science-with-close-up-on-birth-of-sun-like-stars/"
    }
  ],
  "elephant-trunk": [
    {
      "title": "Getman et al. \u00b7 IC 1396A",
      "url": "https://arxiv.org/abs/1208.1471"
    }
  ],
  "broom": [
    {
      "title": "Kun et al. \u00b7 Star formation in Cepheus",
      "url": "https://www.aspbooks.org/publications/904/124.pdf"
    }
  ],
  "pacman": [
    {
      "title": "NASA \u00b7 Pacman Nebula",
      "url": "https://science.nasa.gov/photojournal/the-pacman-nebula/"
    }
  ],
  "monkey-head": [
    {
      "title": "NASA \u00b7 NGC 2174",
      "url": "https://science.nasa.gov/asset/webb/infrared-universe-the-monkey-head-nebula-ngc-2174/"
    }
  ],
  "bubble": [
    {
      "title": "NASA / Hubble \u00b7 Bubble Nebula",
      "url": "https://science.nasa.gov/asset/hubble/the-bubble-nebula-ngc-7635-wfpc2/"
    }
  ],
  "flying-bat": [
    {
      "title": "Corradi et al. \u00b7 Ou4 physical conditions and kinematics",
      "url": "https://www.iac.es/es/ciencia-y-tecnologia/publicaciones/gas-physical-conditions-and-kinematics-giant-outflow-ou4"
    }
  ],
  "ngc6559": [
    {
      "title": "ESO \u00b7 NGC 6559",
      "url": "https://www.hq.eso.org/public/news/eso1320/"
    }
  ],
  "cygnus": [
    {
      "title": "NASA / JPL \u00b7 Star formation in Cygnus",
      "url": "https://www.jpl.nasa.gov/images/pia14102-star-formation-in-the-heart-of-the-swan/"
    }
  ],
  "rosette": [
    {
      "title": "NASA / HEASARC \u00b7 NGC 2244 cluster",
      "url": "https://heasarc.gsfc.nasa.gov/W3Browse/all/ngc2244cxo.html"
    }
  ],
  "ic4756": [
    {
      "title": "Ye et al. \u00b7 IC 4756",
      "url": "https://arxiv.org/abs/2110.08104"
    }
  ],
  "witch-head": [
    {
      "title": "NASA \u00b7 Witch Head Nebula",
      "url": "https://www.nasa.gov/image-article/witch-head-nebula/"
    }
  ],
  "vdb126": [
    {
      "title": "IRIDA Observatory \u00b7 vdB 126",
      "url": "https://www.irida-observatory.org/CCD/VdB126/VdB126.html"
    }
  ],
  "veil": [
    {
      "title": "NASA / Hubble \u00b7 Veil Nebula",
      "url": "https://science.nasa.gov/missions/hubble/hubble-revisits-the-veil-nebula/"
    }
  ],
  "north-america": [
    {
      "title": "NASA / Spitzer \u00b7 North America Nebula (PDF)",
      "url": "https://spaceplace.nasa.gov/review/posters/spitzer_posters/spitzer-north-america-nebula-poster.pdf"
    }
  ],
  "andromeda": [
    {
      "title": "NASA \u00b7 Messier 31",
      "url": "https://science.nasa.gov/mission/hubble/science/explore-the-night-sky/hubble-messier-catalog/messier-31/"
    }
  ],
  "pleiades": [
    {
      "title": "NASA \u00b7 Messier 45",
      "url": "https://science.nasa.gov/mission/hubble/science/explore-the-night-sky/hubble-messier-catalog/messier-45/"
    }
  ],
  "m78": [
    {
      "title": "NASA \u00b7 Messier 78",
      "url": "https://science.nasa.gov/mission/hubble/science/explore-the-night-sky/hubble-messier-catalog/messier-78/"
    }
  ],
  "sombrero": [
    {
      "title": "NASA \u00b7 Messier 104",
      "url": "https://science.nasa.gov/mission/hubble/science/explore-the-night-sky/hubble-messier-catalog/messier-104/"
    }
  ],
  "eagle": [
    {
      "title": "NASA \u00b7 Messier 16",
      "url": "https://science.nasa.gov/mission/hubble/science/explore-the-night-sky/hubble-messier-catalog/messier-16/"
    }
  ],
  "lagoon": [
    {
      "title": "NASA \u00b7 Messier 8",
      "url": "https://science.nasa.gov/mission/hubble/science/explore-the-night-sky/hubble-messier-catalog/messier-8/"
    }
  ],
  "trifid": [
    {
      "title": "NASA \u00b7 Messier 20",
      "url": "https://science.nasa.gov/mission/hubble/science/explore-the-night-sky/hubble-messier-catalog/messier-20/"
    }
  ],
  "triangulum": [
    {
      "title": "NASA \u00b7 Messier 33",
      "url": "https://science.nasa.gov/mission/hubble/science/explore-the-night-sky/hubble-messier-catalog/messier-33/"
    }
  ],
  "swan": [
    {
      "title": "NASA \u00b7 Messier 17",
      "url": "https://science.nasa.gov/mission/hubble/science/explore-the-night-sky/hubble-messier-catalog/messier-17/"
    }
  ],
  "m81": [
    {
      "title": "NASA \u00b7 Messier 81",
      "url": "https://science.nasa.gov/mission/hubble/science/explore-the-night-sky/hubble-messier-catalog/messier-81/"
    }
  ],
  "m82": [
    {
      "title": "NASA \u00b7 Messier 82",
      "url": "https://science.nasa.gov/mission/hubble/science/explore-the-night-sky/hubble-messier-catalog/messier-82/"
    }
  ],
  "m51": [
    {
      "title": "NASA \u00b7 Messier 51",
      "url": "https://science.nasa.gov/mission/hubble/science/explore-the-night-sky/hubble-messier-catalog/messier-51/"
    }
  ],
  "m64": [
    {
      "title": "NASA \u00b7 Messier 64",
      "url": "https://science.nasa.gov/mission/hubble/science/explore-the-night-sky/hubble-messier-catalog/messier-64/"
    }
  ],
  "m27": [
    {
      "title": "NASA \u00b7 Messier 27",
      "url": "https://science.nasa.gov/mission/hubble/science/explore-the-night-sky/hubble-messier-catalog/messier-27/"
    }
  ],
  "m5": [
    {
      "title": "NASA \u00b7 Messier 5",
      "url": "https://science.nasa.gov/mission/hubble/science/explore-the-night-sky/hubble-messier-catalog/messier-5/"
    }
  ],
  "ngc891": [
    {
      "title": "NASA \u00b7 Caldwell 23",
      "url": "https://science.nasa.gov/mission/hubble/science/explore-the-night-sky/hubble-caldwell-catalog/caldwell-23/"
    }
  ],
  "crescent": [
    {
      "title": "NASA \u00b7 Caldwell 27",
      "url": "https://science.nasa.gov/mission/hubble/science/explore-the-night-sky/hubble-caldwell-catalog/caldwell-27/"
    }
  ],
  "lagoon-trifid": [
    {
      "title": "NASA \u00b7 Messier 8",
      "url": "https://science.nasa.gov/mission/hubble/science/explore-the-night-sky/hubble-messier-catalog/messier-8/"
    },
    {
      "title": "NASA \u00b7 Messier 20",
      "url": "https://science.nasa.gov/mission/hubble/science/explore-the-night-sky/hubble-messier-catalog/messier-20/"
    }
  ],
  "iris-ghost": [
    {
      "title": "NASA \u00b7 Iris Nebula",
      "url": "https://science.nasa.gov/mission/hubble/science/explore-the-night-sky/hubble-caldwell-catalog/caldwell-4/"
    },
    {
      "title": "NASA \u00b7 Ghost Nebula",
      "url": "https://science.nasa.gov/image-article/apod-2023-october-30-reflections-of-the-ghost-nebula/"
    }
  ]
}
