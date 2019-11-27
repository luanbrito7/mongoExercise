use hospital

db.createCollection("Hospitau")

db.Hospitau.renameCollection("Hospital")

db.Hospital.insert({ nome: "Hospital da Restauracao", endereco: "Recife - PE", salas: 50, leitosPorSala: 5})

db.Hospital.find({nome: "Hospital da Restauracao"}).pretty()

db.Hospital.update( {nome: "Hospital da Restauracao"}, {nome: "Hospital da Restauracao", endereco: "Recife - PE", atendimentos: ["Patricia", "Orlando", "Oswaldo"], anoInauguracao: 1984, salas: 50, leitosPorSala: 5} )


db.Hospital.insert({ nome: "Hospital da Luz", endereco: "Australia", atendimentos: ["Carlos", "Giovanna", "Eduardo"], anoInauguracao: 1995, salas: 80, leitosPorSala: 8 })

db.Hospital.insert({ nome: "Hospital PT", endereco: "Carpina", atendimentos: ["Dilma", "Lula", "Haddad", "Manuela"], anoInauguracao: 2000, salas: 20, leitosPorSala: 5 })

db.Hospital.insert({ nome: "Hospital Bed Stuy", endereco: "Brooklyn", atendimentos: ["Perigo", "Gregorio", "Chris", "Carlos"], anoInauguracao: 1994, salas: 30, leitosPorSala: 6 })

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

db.Hospital.aggregate([
  {
    $match: {
      anoInauguracao: { $gte: 1990 }
    }
  }, {$sort: {"anoInauguracao": 1}}
 ])

db.Hospital.find({anoInauguracao: {$gte: 1990}}).sort({anoInauguracao: 1}).limit(1)

db.Hospital.createIndex( { nome: "text" } )

db.Hospital.find( { $text: { $search: "Restauracao" } } )

db.Hospital.findOne({anoInauguracao: {$gte: 1990}})

db.Hospital.update( {nome: "Hospital da Restauracao"}, {$set: { anoInauguracao: 1989 }} )

db.Hospital.update( {nome: "Hospital da Restauracao"}, {$addToSet: { atendimentos: "Josielma" } } )

db.Hospital.update( {nome: "Hospital PT"}, {$addToSet: { atendimentos: "Josielma" } } )

db.Hospital.aggregate([
   {
      $project: {
         atendimentos: {
            $filter: {
               input: "$atendimentos",
               as: "atendimentos",
               cond: { $eq: ["$$atendimentos", "Josielma"] }
            }
         }
      }
   }
])

db.Hospital.save({nome: "Hospital da Paz", endereco: "Recife - PE", atendimentos: ["Patricia", "Wando", "Patricia"], anoInauguracao: 1983, salas: 35, leitosPorSala: 7 } )


db.Hospital.find( { $where: function() {
   return this.atendimentos.filter(paciente => paciente == "Patricia").length > 0
} } );

db.Hospital.find({
   atendimentos: {
      $all: ["Patricia", "Wando"]
   }
})

db.Hospital.aggregate( [
   {
     $group: {
        _id: null,
        count: { $sum: 1 }
     }
   }
 ] )

 db.Hospital.find( { atendimentos: { $exists: true, $nin: [ "Lula", "Patricia" ] } } )

 db.Hospital.aggregate(
   [
     {
       $group:
         {
            _id: "$nome",
           LeitosTotais: { $sum: { $multiply: [ "$salas", "$leitosPorSala" ] } },
           count: { $sum: 1 }
         }
     }
   ]
)

db.Hospital.aggregate(
   [
     {
       $group:
         {
           _id: null,
           maxLeitosUnicos: { $max: { $multiply: [ "$salas", "$leitosPorSala" ] } },
         }
     }
   ]
)

