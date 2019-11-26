use hospital

db.createCollection("Hospitau")

db.Hospitau.renameCollection("Hospital")

db.Hospital.insert({ nome: "Hospital da Restauracao", endereco: "Recife - PE" })

db.Hospital.find({nome: "Hospital da Restauracao"}).pretty()
 
db.Hospital.update( {nome: "Hospital da Restauracao"}, {nome: "Hospital da Restauracao", endereco: "Recife - PE", atendimentos: ["Patricia", "Orlando", "Oswaldo"], anoInauguracao: 1984} )


db.Hospital.insert({ nome: "Hospital da Luz", endereco: "Australia", atendimentos: ["Carlos", "Giovanna", "Eduardo"], anoInauguracao: 1995 })

db.Hospital.aggregate([
   {
      $project: {
         nome: 1,
         endereco: 1,
         hospital: 1,
         numeroAtendimentos: { $cond: { if: { $isArray: "$atendimentos" }, then: { $size: "$atendimentos" }, else: "NA"} }
      }
   }
])
