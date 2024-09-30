import { EtapesParcoursBassins } from '~/components/faq/parcours-bassins/etapes-parcours-bassins'

export default function ParcoursBassinsPage() {
  return (
    <>
      <h1>Parcours Bassin d&apos;Habitat</h1>
      <h6>Calculer un besoin en logements à l&apos;échelle d&apos;un ou plusieurs bassin(s) d&apos;habitat.</h6>

      <p>
        Ce parcours ne fait intervenir que l&apos;échelle du bassin d&apos;habitat. Il permet de calculer un besoin en logement à
        l&apos;échelle d&apos;un ou plusieurs bassin(s) d&apos;habitat.
      </p>
      <ul>
        <li>d&apos;un bassin d&apos;habitat, dans le cadre de l&apos;élaboration d&apos;un SCoT, par exemple,</li>
        <li>
          de plusieurs bassins d&apos;habitat. Par addition, il vous sera facile d&apos;obtenir un résultat à l&apos;échelle d&apos;un
          département ou de l&apos;ensemble de la région en utilisant un paramétrage unique ou bien en définissant des hypothèses
          spécifiques pour chaque bassin.
        </li>
      </ul>
      <EtapesParcoursBassins />
    </>
  )
}
