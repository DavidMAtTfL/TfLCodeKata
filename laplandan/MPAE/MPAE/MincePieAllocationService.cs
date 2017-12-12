using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MPAE
{
    public static class MincePieAllocationService
    {
        public static int CalculateFare(Account account, IEnumerable<Journey> journeyHistory)
        {
            List<Journey> journeyWithoutBoatyMcBoatFace = new List<Journey>();
            List<Journey> journeyWithBoatyFace = new List<Journey>();
            foreach (var journey in journeyHistory)
            {
                switch (journey.Line)
                {
                    case "BoatyMcBoatFace":
                            journeyWithBoatyFace.Add(journey);
                            break;
                    case "Out Of Sleigh Interchange":
                            break;
                    default:
                            journeyWithoutBoatyMcBoatFace.Add(journey);
                            break;
                }
            }

            var boatCost = journeyWithBoatyFace.Count() * 8;
            var allStops = journeyWithoutBoatyMcBoatFace.Sum(s => s.Stops);

            var allStopsCost = Math.Floor((double)allStops / 2);

            return boatCost + (int)allStopsCost;
        }
    }
}
