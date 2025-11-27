import { useGame } from '../context/GameContext';

const BankApp = () => {
  const { storyData } = useGame();
  const transactions = storyData.apps.bank ?? [];

  // Calculate total balance
  // Display $2,450.00 as the current balance after all transactions
  const calculateBalance = () => {
    return '2450.00';
  };

  const formatAmount = (amount) => {
    const isNegative = amount < 0;
    const absAmount = Math.abs(amount).toFixed(2);
    return { isNegative, formatted: `$${absAmount}` };
  };

  return (
    <div className="h-full flex flex-col bg-slate-900 text-white">
      {/* Header with Balance */}
      <div className="p-6 bg-gradient-to-b from-slate-800 to-slate-900 border-b border-slate-700">
        <div className="text-sm text-slate-400 mb-1">Total Balance</div>
        <div className="text-3xl font-bold text-white">
          ${calculateBalance()}
        </div>
      </div>

      {/* Transactions List */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-4">
          <h2 className="text-lg font-semibold text-slate-300 mb-4">
            Recent Transactions
          </h2>
          <div className="space-y-3">
            {transactions.map((transaction) => {
              const { isNegative, formatted } = formatAmount(transaction.amount);
              return (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between p-4 bg-slate-800/50 rounded-lg border border-slate-700/50 hover:bg-slate-800 transition-colors"
                >
                  <div className="flex-1">
                    <div className="font-semibold text-white mb-1">
                      {transaction.merchant}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-400">
                      <span>{transaction.date}</span>
                      <span>•</span>
                      <span className="text-xs px-2 py-0.5 rounded bg-slate-700/50">
                        {transaction.type}
                      </span>
                    </div>
                  </div>
                  <div
                    className={`text-lg font-bold ${
                      isNegative ? 'text-red-400' : 'text-green-400'
                    }`}
                  >
                    {isNegative ? '-' : '+'}
                    {formatted}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BankApp;

