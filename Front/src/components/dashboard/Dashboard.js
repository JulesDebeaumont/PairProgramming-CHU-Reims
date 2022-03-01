function Dashboard() {
  return (
    <>
      <div className="ml-3 mb-5">
        <div className="py-3 mb-6">
          <h2 className="text-3xl font-bold">Énoncé :</h2>
        </div>
        <div className="italic text-xl">
          <p className="mb-0">On souhaite gérer un ensemble de règles composées de critères qui sont : un terme + un opérateur + une valeur.</p>

          <p className="mb-5">Exemples de critères :</p>
          <ul className="ml-5 mb-14">
            <li>- Age &gt; 10,</li>
            <li>- Sexe = F,</li>
            <li>- Date de venue comprise entre le 1/1/2020 et le 31/3/2020.</li>
          </ul>

          <p className="mb-0">On peut combiner ces critères simples en une règle plus complexe avec des ET et des OU, et on peut combiner ces ET ou OU entre eux.</p>

          <p className="mb-5">Exemple à un deux niveaux :</p>
          <ul className="ml-5 mb-14">
            <li className="text-sky-200">(Age &lt; 10 ET Sexe = F) OU (Age &gt; 50 ET Date de venue = 8/1/2020)</li>
            <p className="my-5">qu'on peut aussi écrire :</p>
            <ul className="text-indigo-200">
              <li>OU</li>
              <ul className="ml-5">
                <li>ET</li>
                <ul className="ml-5">
                  <li>Age &lt; 10</li>
                  <li>Sexe = F</li>
                </ul>
                <li>ET</li>
                <ul className="ml-5">
                  <li>Age &gt; 50</li>
                  <li>Date de venue = 8/1/2020</li>
                </ul>
              </ul>
            </ul>
          </ul>

          <p className="mb-2">L'application permettra :</p>
          <ul className="ml-5 mb-10">
            <li>- de définir les termes (Age, Sexe, Date de venue...) et leur type (Texte, numérique, date) dans un catalogue ✔</li> 
            <li>- d'afficher le catalogue des termes ✔</li>
            <li>- de modifier un terme ✔</li>
            <li>- de créer une nouvelle règle composée d'une combinaison de critères avec des ET et des OU ✔</li>
            <li>- d'afficher la liste des règles ✔</li>
            <li> - de modifier une règle existante ✔</li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
