using System;
namespace Common.Utils
{
   public static class SequenceNumberGenerator
    {
        private static int _value = -1;
        private static readonly object m_lock = new object();

        public static int Next
        {
            get
            {
                lock(m_lock)
                {
                    if (_value == Int32.MaxValue)
                        _value = -1;
                    return ++_value;
                }
            }
        }
    }
}