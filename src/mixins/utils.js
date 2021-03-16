const rarity = {
  None: {
    color: '#b0c3d945',
    name: 'None',
    value: 0
  },
  Common: {
    color: '#b0c3d9',
    name: 'Common',
    value: 1
  },
  Uncommon: {
    color: '#5e98d9',
    name: 'Uncommon',
    value: 1
  },
  Rare: {
    color: '#4b69ff',
    name: 'Rare',
    value: 2
  },
  Mythical: {
    color: '#8847ff',
    name: 'Mythical',
    value: 3
  },
  Legendary: {
    color: '#d32ce6',
    name: 'Legendary',
    value: 4
  },
  Immortal: {
    color: '#b28a33',
    name: 'Immortal',
    value: 5
  },
  Arcana: {
    color: '#ade55c',
    name: 'Arcana',
    value: 6
  },
  Ancient: {
    color: '#eb4b4b',
    name: 'Ancient',
    value: 7
  }
};

function getRarity(genschain) {
  // most of visual gens have 2 parts - type (0-9) and color(0-4)
  // head have 1 digit
  // claws have 1 digit
  // Color Scheme have 3 digits
  // MutagenImutable have 3 digits
  // e.g. 777 03 03 43 31 14 33 44 11 73 1 4 110 158
  //      777 01 64 02 94 03 04 40 24 11 4 1 076 065
  // Aura-12   Horns-11   Scales-10   Spots-9   Tail-8   Wings-7
  // Spins-6   Body-5   Eyes-4   Head-3   Claws-2   Color Scheme-1   MutagenImutable-0  
  const rarity_obj = {
    aura: "",
    horns: "",
    scales: "",
    spots: "",
    tail: "",
    wings: "",
    spins: "",
    body: "",
    eyes: "",
    head: ""
  };

  // Aura
  // 0 - 40%
  // 1 - 30%
  // 2 - 10%
  // 3 - 10% 
  // 4 - 5%
  // 5 - 5%
  const aura_gen = genschain.substr(3, 1);
  switch (aura_gen) {
    case '0':
      rarity_obj.aura = rarity.None;
      break;
    case '1':
      rarity_obj.aura = rarity.Uncommon;
      break;
    case '2':
      rarity_obj.aura = rarity.Rare;
      break;
    case '3':
      rarity_obj.aura = rarity.Rare;
      break;
    case '4':
      rarity_obj.aura = rarity.Mythical;
      break;
    case '5':
      rarity_obj.aura = rarity.Legendary;
      break;
  }

  // Horns
  // 0 - 30%
  // 1 - 20%
  // 2 - 10%
  // 3 - 10%
  // 4 - 10%
  // 5 - 10%
  // 6 - 5%
  // 7 - 5%
  const horns_gen = genschain.substr(5, 1);
  switch (horns_gen) {
    case '0':
      rarity_obj.horns = rarity.None;
      break;
    case '1':
      rarity_obj.horns = rarity.Uncommon;
      break;
    case '2':
      rarity_obj.horns = rarity.Rare;
      break;
    case '3':
      rarity_obj.horns = rarity.Rare;
      break;
    case '4':
      rarity_obj.horns = rarity.Rare;
      break;
    case '5':
      rarity_obj.horns = rarity.Rare;
      break;
    case '6':
      rarity_obj.horns = rarity.Mythical;
      break;
    case '7':
      rarity_obj.horns = rarity.Legendary;
      break;
  }

  // Scales
  // 0 - 40%
  // 1 - 30%
  // 2 - 20%
  // 3 - 5%
  // 4 - 5%
  const scales_gen = genschain.substr(7, 1);
  switch (scales_gen) {
    case '0':
      rarity_obj.scales = rarity.Common;
      break;
    case '1':
      rarity_obj.scales = rarity.Uncommon;
      break;
    case '2':
      rarity_obj.scales = rarity.Rare;
      break;
    case '3':
      rarity_obj.scales = rarity.Mythical;
      break;
    case '4':
      rarity_obj.scales = rarity.Legendary;
      break;
  }

  // Spots
  // 0 - 10%
  // 1 - 20%
  // 2 - 10%
  // 3 - 10%
  // 4 - 10%
  // 5 - 10%
  // 6 - 10%
  // 7 - 10%
  // 8 - 5%
  // 9 - 5%
  const spots_gen = genschain.substr(9, 1);
  switch (spots_gen) {
    case '0':
      rarity_obj.spots = rarity.None;
      break;
    case '1':
      rarity_obj.spots = rarity.Common;
      break;
    case '2':
      rarity_obj.spots = rarity.Uncommon;
      break;
    case '3':
      rarity_obj.spots = rarity.Uncommon;
      break;
    case '4':
      rarity_obj.spots = rarity.Uncommon;
      break;
    case '5':
      rarity_obj.spots = rarity.Uncommon;
      break;
    case '6':
      rarity_obj.spots = rarity.Uncommon;
      break;
    case '7':
      rarity_obj.spots = rarity.Uncommon;
      break;
    case '8':
      rarity_obj.spots = rarity.Ancient;
      break;
    case '9':
      rarity_obj.spots = rarity.Ancient;
      break;
  }

  // Tail
  // 0 - 10%
  // 1 - 30%
  // 2 - 10%
  // 3 - 10%
  // 4 - 10%
  // 5 - 10%
  // 6 - 10%
  // 7 - 5%
  // 8 - 5%
  const tail_gen = genschain.substr(11, 1);
  switch (tail_gen) {
    case '0':
      rarity_obj.tail = rarity.None;
      break;
    case '1':
      rarity_obj.tail = rarity.Uncommon;
      break;
    case '2':
      rarity_obj.tail = rarity.Rare;
      break;
    case '3':
      rarity_obj.tail = rarity.Rare;
      break;
    case '4':
      rarity_obj.tail = rarity.Rare;
      break;
    case '5':
      rarity_obj.tail = rarity.Rare;
      break;
    case '6':
      rarity_obj.tail = rarity.Rare;
      break;
    case '7':
      rarity_obj.tail = rarity.Mythical;
      break;
    case '8':
      rarity_obj.tail = rarity.Legendary;
      break;
  }

  // Wings
  // 0 - 30%
  // 1 - 30%
  // 2 - 20%
  // 3 - 10%
  // 4 - 5%
  // 5 - 5%
  const wings_gen = genschain.substr(13, 1);
  switch (wings_gen) {
    case '0':
      rarity_obj.wings = rarity.None;
      break;
    case '1':
      rarity_obj.wings = rarity.Common;
      break;
    case '2':
      rarity_obj.wings = rarity.Uncommon;
      break;
    case '3':
      rarity_obj.wings = rarity.Rare;
      break;
    case '4':
      rarity_obj.wings = rarity.Mythical;
      break;
    case '5':
      rarity_obj.wings = rarity.Legendary;
      break;
  }

  // Spins
  // 0 - 30%
  // 1 - 20%
  // 2 - 40%
  // 3 - 5%
  // 4 - 5%
  const spins_gen = genschain.substr(15, 1);
  switch (spins_gen) {
    case '0':
      rarity_obj.spins = rarity.Uncommon;
      break;
    case '1':
      rarity_obj.spins = rarity.Rare;
      break;
    case '2':
      rarity_obj.spins = rarity.Common;
      break;
    case '3':
      rarity_obj.spins = rarity.Mythical;
      break;
    case '4':
      rarity_obj.spins = rarity.Legendary;
      break;
  }

  // Body
  // 1 - 90%
  // 2 - 5%
  // 3 - 5%
  const body_gen = genschain.substr(17, 1);
  switch (body_gen) {
    case '1':
      rarity_obj.body = rarity.Common;
      break;
    case '2':
      rarity_obj.body = rarity.Mythical;
      break;
    case '3':
      rarity_obj.body = rarity.Immortal;
      break;
  }

  // Eyes
  // 1 - 30%
  // 2 - 10%
  // 3 - 10%
  // 4 - 10%
  // 5 - 10%
  // 6 - 10%
  // 7 - 10%
  // 8 - 5%
  // 9 - 5%
  const eyes_gen = genschain.substr(19, 1);
  switch (eyes_gen) {
    case '1':
      rarity_obj.eyes = rarity.Common;
      break;
    case '2':
      rarity_obj.eyes = rarity.Rare;
      break;
    case '3':
      rarity_obj.eyes = rarity.Rare;
      break;
    case '4':
      rarity_obj.eyes = rarity.Rare;
      break;
    case '5':
      rarity_obj.eyes = rarity.Rare;
      break;
    case '6':
      rarity_obj.eyes = rarity.Mythical;
      break;
    case '7':
      rarity_obj.eyes = rarity.Mythical;
      break;
    case '8':
      rarity_obj.eyes = rarity.Legendary;
      break;
    case '9':
      rarity_obj.eyes = rarity.Immortal;
      break;
  }

  // Head
  // 1 - 70%
  // 2 - 10%
  // 3 - 10%
  // 4 - 5%
  // 5 - 5%
  const head_gen = genschain.substr(21, 1);
  switch (head_gen) {
    case '1':
      rarity_obj.head = rarity.Common;
      break;
    case '2':
      rarity_obj.head = rarity.Rare;
      break;
    case '3':
      rarity_obj.head = rarity.Legendary;
      break;
    case '4':
      rarity_obj.head = rarity.Immortal;
      break;
    case '5':
      rarity_obj.head = rarity.Arcana;
      break;
  }

  return rarity_obj;
}

export default {
  methods: {
    __getRarity(genschain) {
      let color = rarity.Common.color;
      let name = rarity.Common.name;
      const values =  getRarity(genschain);
      const reducer = (accumulator, currentValue) => {
        return accumulator + currentValue.value;
      };
      const rarityLevel = Object.values(values).reduce(reducer, 0);

      if (rarityLevel >= 56) {
        color = rarity.Ancient.color;
        name = rarity.Ancient.name;
      } else if (rarityLevel >= 48) {
        color = rarity.Arcana.color;
        name = rarity.Arcana.name;
      } else if (rarityLevel >= 40) {
        color = rarity.Immortal.color;
        name = rarity.Immortal.name;
      } else if (rarityLevel >= 32) {
        name = rarity.Legendary.name;
        color = rarity.Legendary.color;
      } else if (rarityLevel >= 24) {
        name = rarity.Mythical.name;
        color = rarity.Mythical.color;
      } else if (rarityLevel >= 16) {
        name = rarity.Rare.name;
        color = rarity.Rare.color;
      } else if (rarityLevel >= 8) {
        name = rarity.Uncommon.name;
        color = rarity.Uncommon.color;
      }

      return {
        values,
        name,
        color
      };
    }
  }
};
