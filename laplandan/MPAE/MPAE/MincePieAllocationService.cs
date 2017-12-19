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
            if (account.Name.ToLower().Contains("elf"))
            {
                return 0;
            }
            List<Journey> journeyWithoutBoatyMcBoatFace = new List<Journey>();
            List<Journey> journeyWithBoatyFace = new List<Journey>();
            int linesTravelledOn = 0;
            foreach (var journey in journeyHistory)
            {

                switch (journey.Line)
                {
                    case "BoatyMcBoatFace":
                            journeyWithBoatyFace.Add(journey);
                            linesTravelledOn++;
                            break;
                    case "Out Of Sleigh Interchange":
                            break;
                    default:
                            journeyWithoutBoatyMcBoatFace.Add(journey);
                            linesTravelledOn++;
                            break;
                }
            }
            var coalCost = linesTravelledOn * account.LumpsOfCoal;
            var boatCost = journeyWithBoatyFace.Count() * 8;
            var allStops = journeyWithoutBoatyMcBoatFace.Sum(s => s.Stops);

            var allStopsCost = Math.Floor((double)allStops / 2);

            var subTotal = (boatCost + (int)allStopsCost) + coalCost;
            var cap = 30 - account.CandyCanes;

            return Math.Min(subTotal, cap);
        }
    }
}
