open System
[<EntryPoint>]
let main(args : string[]) = 
  let calculateCost bookCount = bookCount * 8

  let totalCost = 
    args
    |> Array.length  
    |> calculateCost

  let distinctBookCount =
    args
    |> Seq.distinct
    |> Seq.length

  let discountMap = 
    [0;5;10;20;25]

  let removeDiscount cost distinctBooks = 
    (float)cost * (1.0 - (float)(Seq.nth (distinctBooks - 1) discountMap) / 100.0)

  let discountedCost = removeDiscount totalCost distinctBookCount

  Console.WriteLine totalCost
  Console.WriteLine discountedCost
  0