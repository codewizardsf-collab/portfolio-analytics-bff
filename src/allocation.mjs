export function buildAllocationResponse(positions) {
  const gross = positions.reduce((sum, position) => sum + Math.abs(position.marketValue), 0);
  const bySector = new Map();

  for (const position of positions) {
    const existing = bySector.get(position.sector) ?? 0;
    bySector.set(position.sector, existing + Math.abs(position.marketValue));
  }

  return {
    grossExposure: roundMoney(gross),
    sectors: [...bySector.entries()]
      .map(([sector, exposure]) => ({
        sector,
        exposure: roundMoney(exposure),
        weight: gross === 0 ? 0 : Math.round((exposure / gross) * 10000) / 100
      }))
      .sort((left, right) => right.exposure - left.exposure)
  };
}

export function performanceAttribution(positions) {
  return positions
    .map(position => ({
      symbol: position.symbol,
      contribution: roundMoney(position.quantity * (position.marketPrice - position.previousClose)),
      benchmarkDelta: Math.round((position.returnPercent - position.benchmarkReturnPercent) * 10000) / 10000
    }))
    .sort((left, right) => Math.abs(right.contribution) - Math.abs(left.contribution));
}

function roundMoney(value) {
  return Math.round((value + Number.EPSILON) * 100) / 100;
}
